import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route.jsx';
import prisma from '../../../../libs/prismadb.jsx';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 获取所有映射关系
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: '需要管理员权限' },
                { status: 403 }
            );
        }

        const mappings = await prisma.productCourseMapping.findMany({
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        courseId: true,
                        status: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 获取Stripe产品信息
        const mappingsWithProductInfo = await Promise.all(
            mappings.map(async (mapping) => {
                try {
                    const product = await stripe.products.retrieve(mapping.stripeProductId);
                    return {
                        ...mapping,
                        productName: product.name,
                        productDescription: product.description,
                        productActive: product.active
                    };
                } catch (error) {
                    console.error(`Error fetching Stripe product ${mapping.stripeProductId}:`, error);
                    return {
                        ...mapping,
                        productName: '获取失败',
                        productDescription: null,
                        productActive: false
                    };
                }
            })
        );

        return NextResponse.json(mappingsWithProductInfo);
    } catch (error) {
        console.error('Error fetching product mappings:', error);
        return NextResponse.json(
            { error: '获取映射关系失败' },
            { status: 500 }
        );
    }
}

// 创建新的映射关系
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: '需要管理员权限' },
                { status: 403 }
            );
        }

        const { stripeProductId, courseId } = await request.json();

        if (!stripeProductId || !courseId) {
            return NextResponse.json(
                { error: 'Stripe产品ID和课程ID都是必填项' },
                { status: 400 }
            );
        }

        // 验证课程存在
        const course = await prisma.course.findUnique({
            where: { id: courseId }
        });

        if (!course) {
            return NextResponse.json(
                { error: '课程不存在' },
                { status: 404 }
            );
        }

        // 验证Stripe产品存在
        try {
            await stripe.products.retrieve(stripeProductId);
        } catch (error) {
            return NextResponse.json(
                { error: 'Stripe产品ID无效' },
                { status: 400 }
            );
        }

        // 检查映射是否已存在
        const existingMapping = await prisma.productCourseMapping.findUnique({
            where: { stripeProductId }
        });

        if (existingMapping) {
            return NextResponse.json(
                { error: '该Stripe产品已存在映射关系' },
                { status: 409 }
            );
        }

        // 创建映射关系
        const mapping = await prisma.productCourseMapping.create({
            data: {
                stripeProductId,
                courseId,
                isActive: true
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        courseId: true,
                        status: true
                    }
                }
            }
        });

        return NextResponse.json(mapping, { status: 201 });
    } catch (error) {
        console.error('Error creating product mapping:', error);
        return NextResponse.json(
            { error: '创建映射关系失败' },
            { status: 500 }
        );
    }
}