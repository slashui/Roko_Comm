import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route.jsx';
import prisma from '../../../../libs/prismadb.jsx';
import Stripe from 'stripe';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: '请先登录' },
                { status: 401 }
            );
        }

        const purchases = await prisma.purchase.findMany({
            where: {
                userId: session.user.id
                // 移除status过滤，显示所有购买记录
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 如果有购买记录，从Stripe获取产品信息
        if (purchases.length > 0) {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            
            const purchasesWithProductInfo = await Promise.all(
                purchases.map(async (purchase) => {
                    try {
                        const product = await stripe.products.retrieve(purchase.productId);
                        return {
                            ...purchase,
                            productName: product.name,
                            productDescription: product.description
                        };
                    } catch (error) {
                        console.error(`Error fetching product ${purchase.productId}:`, error);
                        return {
                            ...purchase,
                            productName: '未知产品',
                            productDescription: null
                        };
                    }
                })
            );
            
            return NextResponse.json(purchasesWithProductInfo);
        }

        return NextResponse.json(purchases);
    } catch (error) {
        console.error('Error fetching purchases:', error);
        return NextResponse.json(
            { error: '获取购买记录失败' },
            { status: 500 }
        );
    }
}