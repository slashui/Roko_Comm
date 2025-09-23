import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route.jsx';
import prisma from '../../../../libs/prismadb.jsx';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: '用户未登录' },
                { status: 401 }
            );
        }

        const { sessionId } = await request.json();
        
        if (!sessionId) {
            return NextResponse.json(
                { error: '缺少会话ID' },
                { status: 400 }
            );
        }

        // 查找游客购买记录
        const guestPurchase = await prisma.purchase.findFirst({
            where: {
                userId: `guest_${sessionId}`,
                status: 'COMPLETED'
            }
        });

        if (!guestPurchase) {
            return NextResponse.json(
                { error: '未找到对应的购买记录' },
                { status: 404 }
            );
        }

        // 更新购买记录，关联到真实用户
        await prisma.purchase.update({
            where: {
                id: guestPurchase.id
            },
            data: {
                userId: session.user.id
            }
        });

        // 升级用户角色
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        if (user && user.role === 'FREE') {
            await prisma.user.update({
                where: { id: session.user.id },
                data: { role: 'PRIME' }
            });
        }

        // 自动为用户分配课程权限
        const courses = await prisma.course.findMany({
            where: {
                status: 'PUBLISHED'
            }
        });

        for (const course of courses) {
            const existingAccess = await prisma.userCourse.findUnique({
                where: {
                    userId_courseId: {
                        userId: session.user.id,
                        courseId: course.id
                    }
                }
            });

            if (!existingAccess) {
                await prisma.userCourse.create({
                    data: {
                        userId: session.user.id,
                        courseId: course.id,
                        accessMethod: 'PURCHASED',
                        purchaseId: guestPurchase.id
                    }
                });
            }
        }

        return NextResponse.json({ 
            success: true,
            message: '购买记录已成功关联到您的账户' 
        });
    } catch (error) {
        console.error('Link purchase error:', error);
        return NextResponse.json(
            { error: '关联购买记录失败' },
            { status: 500 }
        );
    }
}