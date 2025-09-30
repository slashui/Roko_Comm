const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSystemStatus() {
    try {
        console.log('=== 系统状态检查 ===');
        
        // 1. 检查所有游客购买记录
        console.log('\n1. 检查游客购买记录:');
        const guestPurchases = await prisma.purchase.findMany({
            where: {
                userId: { startsWith: 'guest_' }
            },
            orderBy: { createdAt: 'desc' }
        });
        
        console.log('游客购买记录数量:', guestPurchases.length);
        guestPurchases.forEach((p, i) => {
            console.log(`游客购买 ${i+1}:`, {
                id: p.id,
                userId: p.userId,
                productId: p.productId,
                amount: p.amount,
                status: p.status,
                stripeSessionId: p.stripeSessionId,
                createdAt: p.createdAt
            });
        });
        
        // 2. 检查所有课程
        console.log('\n2. 检查所有课程:');
        const courses = await prisma.course.findMany({
            select: {
                id: true,
                courseId: true,
                title: true,
                status: true,
                _count: {
                    select: {
                        userCourses: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        
        console.log('课程总数:', courses.length);
        courses.forEach((c, i) => {
            console.log(`课程 ${i+1}:`, {
                id: c.id,
                courseId: c.courseId,
                title: c.title,
                status: c.status,
                enrolledUsers: c._count.userCourses
            });
        });
        
        // 3. 检查产品课程映射
        console.log('\n3. 检查产品课程映射:');
        const mappings = await prisma.productCourseMapping.findMany({
            include: {
                course: {
                    select: {
                        id: true,
                        courseId: true,
                        title: true,
                        status: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        
        console.log('映射总数:', mappings.length);
        mappings.forEach((m, i) => {
            console.log(`映射 ${i+1}:`, {
                stripeProductId: m.stripeProductId,
                courseId: m.course.courseId,
                courseTitle: m.course.title,
                courseStatus: m.course.status,
                isActive: m.isActive,
                createdAt: m.createdAt
            });
        });
        
        // 4. 检查所有购买记录（包括正常用户）
        console.log('\n4. 检查所有购买记录:');
        const allPurchases = await prisma.purchase.findMany({
            include: {
                user: {
                    select: {
                        email: true,
                        name: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 10 // 只显示最近10条
        });
        
        console.log('购买记录总数:', allPurchases.length);
        allPurchases.forEach((p, i) => {
            console.log(`购买 ${i+1}:`, {
                id: p.id,
                userId: p.userId,
                userEmail: p.user?.email || '游客',
                productId: p.productId,
                amount: p.amount,
                status: p.status,
                stripeSessionId: p.stripeSessionId,
                createdAt: p.createdAt
            });
        });
        
        // 5. 检查用户课程关系
        console.log('\n5. 检查用户课程关系:');
        const userCourses = await prisma.userCourse.findMany({
            include: {
                user: {
                    select: {
                        email: true,
                        name: true
                    }
                },
                course: {
                    select: {
                        courseId: true,
                        title: true,
                        status: true
                    }
                }
            },
            orderBy: { grantedAt: 'desc' },
            take: 10
        });
        
        console.log('用户课程关系总数:', userCourses.length);
        userCourses.forEach((uc, i) => {
            console.log(`关系 ${i+1}:`, {
                userEmail: uc.user.email,
                courseId: uc.course.courseId,
                courseTitle: uc.course.title,
                accessMethod: uc.accessMethod,
                grantedAt: uc.grantedAt
            });
        });
        
    } catch (error) {
        console.error('错误:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkSystemStatus();