import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route.jsx';
import prisma from '../../../../libs/prismadb.jsx';

/**
 * 用户认领检查函数
 * 在用户登录/注册成功后自动检查并认领待认领的购买记录
 */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json(
        { error: '用户未登录或邮箱信息缺失' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    // 查找所有基于该邮箱的待认领购买记录
    const pendingPurchases = await prisma.purchase.findMany({
      where: {
        customerEmail: userEmail,
        status: 'PENDING_CLAIM',
        userId: null
      },
      include: {
        userCourses: true
      }
    });

    if (pendingPurchases.length === 0) {
      return NextResponse.json({
        success: true,
        message: '没有待认领的购买记录',
        claimedCount: 0
      });
    }

    let claimedCount = 0;
    let coursesGranted = [];

    // 处理每个待认领的购买记录
    for (const purchase of pendingPurchases) {
      try {
        // 更新购买记录，关联到用户并标记为已完成
        await prisma.purchase.update({
          where: { id: purchase.id },
          data: {
            userId: userId,
            status: 'COMPLETED'
          }
        });

        // 获取产品对应的课程
        const productMapping = await prisma.productCourseMapping.findUnique({
          where: { stripeProductId: purchase.productId },
          include: { course: true }
        });

        if (productMapping) {
          // 检查用户是否已经有该课程的访问权限
          const existingAccess = await prisma.userCourse.findUnique({
            where: {
              userId_courseId: {
                userId: userId,
                courseId: productMapping.courseId
              }
            }
          });

          if (!existingAccess) {
            // 创建课程访问权限
            await prisma.userCourse.create({
              data: {
                userId: userId,
                courseId: productMapping.courseId,
                accessMethod: 'PURCHASED',
                purchaseId: purchase.id
              }
            });

            coursesGranted.push({
              courseId: productMapping.courseId,
              courseTitle: productMapping.course.title,
              purchaseId: purchase.id
            });
          }
        }

        claimedCount++;
      } catch (error) {
        console.error(`Failed to claim purchase ${purchase.id}:`, error);
        // 继续处理其他购买记录，不因单个失败而中断
      }
    }

    return NextResponse.json({
      success: true,
      message: `成功认领 ${claimedCount} 个购买记录`,
      claimedCount,
      coursesGranted
    });

  } catch (error) {
    console.error('Claim purchases error:', error);
    return NextResponse.json(
      { error: '认领购买记录失败' },
      { status: 500 }
    );
  }
}

/**
 * 检查用户是否有待认领的购买记录
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '用户未登录或邮箱信息缺失' },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // 查找待认领的购买记录数量
    const pendingCount = await prisma.purchase.count({
      where: {
        customerEmail: userEmail,
        status: 'PENDING_CLAIM',
        userId: null
      }
    });

    return NextResponse.json({
      hasPendingClaims: pendingCount > 0,
      pendingCount
    });

  } catch (error) {
    console.error('Check pending claims error:', error);
    return NextResponse.json(
      { error: '检查待认领记录失败' },
      { status: 500 }
    );
  }
}