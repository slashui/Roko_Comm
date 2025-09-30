import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route.jsx';
import prisma from '../../../../libs/prismadb.jsx';

export async function POST(request) {
    try {
        console.log('=== Payment API Debug Start ===');
        
        const session = await getServerSession(authOptions);
        console.log('Session:', session);
        console.log('Session user:', session?.user);
        console.log('Session user ID:', session?.user?.id);
        
        // 允许未登录用户创建支付会话
        let userId = null;
        if (session?.user?.id) {
            const dbUser = await prisma.user.findUnique({
                where: { id: session.user.id }
            });
            if (dbUser) {
                userId = dbUser.id;
                console.log('Logged in user verified:', dbUser.id, dbUser.email);
            }
        } else {
            console.log('No session found - allowing guest checkout');
        }

        console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
        console.log('STRIPE_SECRET_KEY preview:', process.env.STRIPE_SECRET_KEY?.slice(0, 7) + '...');
        
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY is not configured');
        }
        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        console.log('Stripe initialized');
        console.log('Stripe checkout available:', !!stripe.checkout);
        console.log('Stripe sessions available:', !!stripe.checkout?.sessions);
        
        const data = await request.json();
        console.log('Request data:', data);
        const { priceId } = data;

        if (!priceId) {
            console.log('No priceId provided');
            return NextResponse.json(
                { error: '价格ID不能为空' },
                { status: 400 }
            );
        }
        
        console.log('Price ID:', priceId);

        const acceptLanguage = request.headers.get('Accept-Language');
        let preferredLocale = 'cn';
        if (acceptLanguage) {
            const locales = acceptLanguage.split(',');
            for (const locale of locales) {
                if (locale.includes('en')) {
                    preferredLocale = 'en';
                    break;
                } else if (locale.includes('zh')) {
                    preferredLocale = 'cn';
                    break;
                }
            }
        }

        console.log('Creating Stripe session...');
        const stripeSession = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            metadata: { 
                priceId: priceId,
                userId: userId || 'guest'
            },
            mode: 'payment',
            // success_url: `https://roko.oneday.build/${preferredLocale}/checkout/success?session_id={CHECKOUT_SESSION_ID}&price_id=${priceId}`,
            // cancel_url: `https://roko.oneday.build/${preferredLocale}/checkout/cancel`,
        
            success_url: `http://localhost:3000/${preferredLocale}/checkout/success?session_id={CHECKOUT_SESSION_ID}&price_id=${priceId}`,
            cancel_url: `http://localhost:3000/${preferredLocale}/checkout/cancel`,
        });
        console.log('Stripe session created:', stripeSession.id);

        console.log('Retrieving price details...');
        const price = await stripe.prices.retrieve(priceId, {
            expand: ['product']
        });
        console.log('Price details:', price);

        // 只有登录用户才创建购买记录，游客用户在支付成功后再处理
        if (userId) {
            console.log('Creating purchase record...');

            // 获取用户邮箱
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { email: true }
            });

            const purchase = await prisma.purchase.create({
                data: {
                    userId: userId,
                    customerEmail: user?.email,
                    productId: price.product.id,
                    stripeSessionId: stripeSession.id,
                    stripePriceId: priceId,
                    amount: price.unit_amount / 100,
                    currency: price.currency.toUpperCase(),
                    status: 'PENDING'
                }
            });
            console.log('Purchase record created:', purchase.id);
        } else {
            console.log('Guest checkout - purchase record will be created after payment');
        }
        
        console.log('Returning session URL:', stripeSession.url);
        console.log('=== Payment API Debug End ===');
        return NextResponse.json(stripeSession.url);
    } catch (error) {
        console.error('=== Payment API Error ===');
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Error details:', error);
        return NextResponse.json(
            { error: '创建支付会话失败: ' + error.message },
            { status: 500 }
        );
    }
}