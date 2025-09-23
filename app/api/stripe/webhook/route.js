import { headers } from 'next/headers';
import Stripe from 'stripe';
import prisma from '../../../../libs/prismadb.jsx';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      const userId = session.metadata?.userId;
      
      if (userId === 'guest') {
        // 游客用户支付成功，需要提示注册
        console.log('Guest payment completed, need to handle registration');
        
        // 获取价格信息
        const priceId = session.metadata?.priceId;
        if (priceId) {
          const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
          const price = await stripe.prices.retrieve(priceId, {
            expand: ['product']
          });
          
          // 保存临时购买记录（没有用户ID）
          await prisma.purchase.create({
            data: {
              userId: 'guest_' + session.id,
              productId: price.product.id,
              stripeSessionId: session.id,
              stripePriceId: priceId,
              amount: price.unit_amount / 100,
              currency: price.currency.toUpperCase(),
              status: 'COMPLETED'
            }
          });
          
          console.log('Guest purchase record created for session:', session.id);
        }
      } else {
        // 已登录用户支付
        const purchase = await prisma.purchase.findUnique({
          where: {
            stripeSessionId: session.id
          }
        });

        if (purchase) {
          await prisma.purchase.update({
            where: {
              id: purchase.id
            },
            data: {
              status: 'COMPLETED'
            }
          });

          const user = await prisma.user.findUnique({
            where: { id: purchase.userId }
          });

          if (user && user.role === 'FREE') {
            await prisma.user.update({
              where: { id: purchase.userId },
              data: { role: 'PRIME' }
            });
          }

          // 从数据库查询产品课程映射关系
          const productMapping = await prisma.productCourseMapping.findUnique({
            where: {
              stripeProductId: purchase.productId,
            },
            include: {
              course: true
            }
          });

          if (productMapping && productMapping.isActive) {
            const course = productMapping.course;
            
            if (course.status === 'PUBLISHED') {
              const existingAccess = await prisma.userCourse.findUnique({
                where: {
                  userId_courseId: {
                    userId: purchase.userId,
                    courseId: course.id
                  }
                }
              });

              if (!existingAccess) {
                await prisma.userCourse.create({
                  data: {
                    userId: purchase.userId,
                    courseId: course.id,
                    accessMethod: 'PURCHASED',
                    purchaseId: purchase.id
                  }
                });
                console.log(`Granted access to course: ${course.title} for product: ${purchase.productId}`);
              } else {
                console.log(`User already has access to course: ${course.title}`);
              }
            } else {
              console.log(`Course not published: ${course.title}`);
            }
          } else {
            console.log(`No active course mapping found for product: ${purchase.productId}`);
          }

          console.log('Payment completed and courses granted for user:', purchase.userId);
        }
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
    }
  }

  return new Response(JSON.stringify({ received: true }));
}