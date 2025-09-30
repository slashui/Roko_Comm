const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSlashuiUser() {
    try {
        console.log('=== 检查用户 slashui@live.cn ===');
        
        // 查找用户
        const user = await prisma.user.findUnique({
            where: { email: 'slashui@live.cn' },
            include: {
                purchases: {
                    orderBy: { createdAt: 'desc' }
                },
                userCourses: {
                    include: {
                        course: {
                            select: {
                                id: true,
                                courseId: true,
                                title: true,
                                status: true
                            }
                        }
                    }
                }
            }
        });
        
        if (!user) {
            console.log('❌ 用户不存在');
            
            // 检查是否有游客购买记录
            console.log('\n=== 检查游客购买记录 ===');
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
            
            return;
        }
        
        console.log('✅ 用户信息:');
        console.log('ID:', user.id);
        console.log('邮箱:', user.email);
        console.log('姓名:', user.name);
        console.log('角色:', user.role);
        console.log('创建时间:', user.createdAt);
        
        console.log('\n=== 购买记录 ===');
        console.log('购买数量:', user.purchases.length);
        user.purchases.forEach((p, i) => {
            console.log(`购买 ${i+1}:`, {
                id: p.id,
                productId: p.productId,
                amount: p.amount,
                status: p.status,
                stripeSessionId: p.stripeSessionId,
                createdAt: p.createdAt
            });
        });
        
        console.log('\n=== 课程访问权限 ===');
        console.log('课程数量:', user.userCourses.length);
        user.userCourses.forEach((uc, i) => {
            console.log(`课程 ${i+1}:`, {
                courseId: uc.course.courseId,
                title: uc.course.title,
                status: uc.course.status,
                accessMethod: uc.accessMethod,
                grantedAt: uc.grantedAt
            });
        });
        
        // 检查产品课程映射
        if (user.purchases.length > 0) {
            console.log('\n=== 检查产品课程映射 ===');
            for (const purchase of user.purchases) {
                const mapping = await prisma.productCourseMapping.findUnique({
                    where: {
                        stripeProductId: purchase.productId
                    },
                    include: {
                        course: true
                    }
                });
                
                console.log(`产品 ${purchase.productId} 的映射:`, mapping ? {
                    courseId: mapping.course.courseId,
                    courseTitle: mapping.course.title,
                    courseStatus: mapping.course.status,
                    mappingActive: mapping.isActive
                } : '无映射');
            }
        }
        
    } catch (error) {
        console.error('错误:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkSlashuiUser();