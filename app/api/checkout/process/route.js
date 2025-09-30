import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '../../../../libs/prismadb.jsx';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    const currentUser = session?.user;

    // 从 Stripe 获取支付会话详情
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product']
    });

    if (stripeSession.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // 查找现有的购买记录
    let purchase = await prisma.purchase.findUnique({
      where: { stripeSessionId: sessionId },
      include: { user: true }
    });

    // 如果没有找到购买记录，从Stripe会话创建一个
    if (!purchase) {
      console.log('Purchase record not found, creating from Stripe session');

      const customerEmail = stripeSession.customer_details?.email;
      const lineItem = stripeSession.line_items.data[0];
      const productId = lineItem.price.product.id;
      const priceId = lineItem.price.id;

      if (!customerEmail || !productId) {
        return NextResponse.json(
          { error: 'Missing customer email or product information' },
          { status: 400 }
        );
      }

      // 创建购买记录
      purchase = await prisma.purchase.create({
        data: {
          userId: currentUser?.id || null,
          customerEmail: customerEmail,
          productId: productId,
          stripeSessionId: sessionId,
          stripePriceId: priceId,
          amount: lineItem.price.unit_amount / 100,
          currency: lineItem.price.currency.toUpperCase(),
          status: currentUser?.id ? 'COMPLETED' : 'PENDING_CLAIM'
        },
        include: { user: true }
      });

      console.log('Purchase record created:', purchase.id, 'Status:', purchase.status);
    }

    // 获取产品和课程映射信息
    const lineItem = stripeSession.line_items.data[0];
    const productId = lineItem.price.product.id;
    
    const productMapping = await prisma.productCourseMapping.findUnique({
      where: { stripeProductId: productId },
      include: { course: true }
    });

    if (!productMapping) {
      return NextResponse.json(
        { error: 'Product course mapping not found' },
        { status: 404 }
      );
    }

    let responseData = {
      purchase,
      course: productMapping.course,
      userStatus: 'unknown'
    };

    // 场景1：用户已登录
    if (currentUser && purchase.userId === currentUser.id) {
      // 更新购买状态为已完成
      purchase = await prisma.purchase.update({
        where: { id: purchase.id },
        data: { status: 'COMPLETED' }
      });

      // 检查是否已经有课程访问权限
      const existingAccess = await prisma.userCourse.findUnique({
        where: {
          userId_courseId: {
            userId: currentUser.id,
            courseId: productMapping.courseId
          }
        }
      });

      if (!existingAccess) {
        // 创建课程访问权限
        await prisma.userCourse.create({
          data: {
            userId: currentUser.id,
            courseId: productMapping.courseId,
            accessMethod: 'PURCHASED',
            purchaseId: purchase.id
          }
        });
      }

      responseData.userStatus = 'logged_in_completed';
      responseData.purchase = purchase;
    }
    // 场景2：用户已登录，但购买记录属于其他邮箱
    else if (currentUser && purchase.customerEmail && purchase.customerEmail !== currentUser.email) {
      responseData.userStatus = 'logged_in_different_email';
      responseData.purchaseEmail = purchase.customerEmail;
    }
    // 场景3：用户已登录，购买记录没有关联用户（游客购买）
    else if (currentUser && !purchase.userId && purchase.customerEmail === currentUser.email) {
      // 认领购买记录
      purchase = await prisma.purchase.update({
        where: { id: purchase.id },
        data: {
          userId: currentUser.id,
          status: 'COMPLETED'
        }
      });

      // 创建课程访问权限
      const existingAccess = await prisma.userCourse.findUnique({
        where: {
          userId_courseId: {
            userId: currentUser.id,
            courseId: productMapping.courseId
          }
        }
      });

      if (!existingAccess) {
        await prisma.userCourse.create({
          data: {
            userId: currentUser.id,
            courseId: productMapping.courseId,
            accessMethod: 'PURCHASED',
            purchaseId: purchase.id
          }
        });
      }

      responseData.userStatus = 'claimed_and_completed';
      responseData.purchase = purchase;
    }
    // 场景4：用户未登录或购买记录需要认领
    else {
      // 更新购买状态为待认领
      purchase = await prisma.purchase.update({
        where: { id: purchase.id },
        data: { status: 'PENDING_CLAIM' }
      });

      responseData.userStatus = 'needs_claim';
      responseData.purchase = purchase;
      responseData.customerEmail = purchase.customerEmail;
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Checkout process error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}