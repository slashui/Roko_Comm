import bcrypt from 'bcrypt'
import prisma from '../../../libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request){
    const body = await request.json();
    const { name, email, password, role, user_level, inviteCode } = body;

    if(!name || !email || !password) {
        return new NextResponse('Missing Fields', { status: 400 })
    }

    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(exist) {
        return NextResponse.json(
            { success: false, message: '该邮箱已被注册' },
            { status: 400 }
        )
    }

    // 验证邀请码（如果提供）
    let inviteCodeData = null;
    if (inviteCode && inviteCode.trim()) {
        const codeToSearch = inviteCode.trim().toUpperCase();
        inviteCodeData = await prisma.inviteCode.findUnique({
            where: { code: codeToSearch },
            include: {
                courses: {
                    include: {
                        course: true
                    }
                }
            }
        });

        if (!inviteCodeData) {
            return NextResponse.json(
                { success: false, message: '邀请码不存在' },
                { status: 400 }
            )
        }

        if (inviteCodeData.status === 'USED') {
            return NextResponse.json(
                { success: false, message: '邀请码已被使用' },
                { status: 400 }
            )
        }

        if (inviteCodeData.status === 'EXPIRED') {
            return NextResponse.json(
                { success: false, message: '邀请码已过期' },
                { status: 400 }
            )
        }

        if (inviteCodeData.expiresAt && new Date() > inviteCodeData.expiresAt) {
            // 自动标记为过期
            await prisma.inviteCode.update({
                where: { id: inviteCodeData.id },
                data: { status: 'EXPIRED' }
            });
            
            return NextResponse.json(
                { success: false, message: '邀请码已过期' },
                { status: 400 }
            )
        }
    }

    // 如果没有指定角色，检查用户等级或订单表
    let userRole = role || user_level || 'FREE';
    
    if (!role && !user_level) {
        const order = await prisma.orderlist.findFirst({
            where: { email },
            orderBy: { addtime: 'desc' },
        });
        
        if (order) {
            // 根据订单金额设置角色
            if (order.amount === 79) {
                userRole = 'PRIME';
            } else if (order.amount === 99) {
                userRole = 'VIP';
            }
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // 使用事务确保数据一致性
        const result = await prisma.$transaction(async (tx) => {
            // 创建用户
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    hashedPassword,
                    image: "/avtar/a.svg",
                    role: userRole
                }
            });

            // 如果有邀请码，关联课程并标记邀请码为已使用
            if (inviteCodeData) {
                // 标记邀请码为已使用
                await tx.inviteCode.update({
                    where: { id: inviteCodeData.id },
                    data: {
                        status: 'USED',
                        usedAt: new Date(),
                        usedBy: user.id
                    }
                });

                // 关联课程
                if (inviteCodeData.courses.length > 0) {
                    const userCourseData = inviteCodeData.courses.map(icc => ({
                        userId: user.id,
                        courseId: icc.courseId,
                        grantedAt: new Date()
                    }));

                    await tx.userCourse.createMany({
                        data: userCourseData
                    });
                }
            }

            // 自动认领该邮箱的购买记录
            const pendingPurchases = await tx.purchase.findMany({
                where: {
                    customerEmail: email,
                    status: {
                        in: ['COMPLETED', 'PENDING_CLAIM']
                    },
                    userId: null
                }
            });

            // 处理待认领的购买记录
            for (const purchase of pendingPurchases) {
                // 获取产品课程映射
                const productMapping = await tx.productCourseMapping.findUnique({
                    where: { stripeProductId: purchase.productId },
                    include: { course: true }
                });

                if (productMapping) {
                    // 更新购买记录
                    await tx.purchase.update({
                        where: { id: purchase.id },
                        data: {
                            userId: user.id,
                            status: 'COMPLETED'
                        }
                    });

                    // 检查是否已有课程权限
                    const existingAccess = await tx.userCourse.findUnique({
                        where: {
                            userId_courseId: {
                                userId: user.id,
                                courseId: productMapping.courseId
                            }
                        }
                    });

                    if (!existingAccess) {
                        // 创建课程访问权限
                        await tx.userCourse.create({
                            data: {
                                userId: user.id,
                                courseId: productMapping.courseId,
                                accessMethod: 'PURCHASED',
                                purchaseId: purchase.id
                            }
                        });
                    }
                }
            }

            return user;
        });

        return NextResponse.json({
            success: true,
            user: result,
            message: '注册成功'
        })
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, message: '注册失败，请稍后重试' },
            { status: 500 }
        )
    }
}