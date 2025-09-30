const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function simulateStripePurchase() {
  try {
    console.log('模拟Stripe购买流程，为用户slashui@live.cn创建购买记录...')
    
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email: 'slashui@live.cn' }
    })
    
    if (!user) {
      console.log('❌ 用户不存在')
      return
    }
    
    console.log(`✅ 找到用户: ${user.email} (${user.id})`)
    
    // 获取第一个Stripe产品ID（模拟用户购买的产品）
    const productIds = JSON.parse(process.env.STRIPE_PRODUCT_IDS || '[]')
    if (productIds.length === 0) {
      console.log('❌ 没有配置Stripe产品ID')
      return
    }
    
    const purchasedProductId = productIds[0] // 假设用户购买了第一个产品
    console.log(`模拟购买产品: ${purchasedProductId}`)
    
    // 检查是否已有购买记录
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: user.id,
        productId: purchasedProductId
      }
    })
    
    if (existingPurchase) {
      console.log('⚠️  用户已有此产品的购买记录')
      console.log(`购买记录ID: ${existingPurchase.id}`)
      console.log(`状态: ${existingPurchase.status}`)
      console.log(`购买时间: ${existingPurchase.createdAt}`)
    } else {
      // 创建购买记录
      const purchase = await prisma.purchase.create({
        data: {
          userId: user.id,
          productId: purchasedProductId,
          stripeSessionId: `cs_test_simulated_${Date.now()}`,
          stripePriceId: 'price_test_simulated',
          amount: 9900, // 99.00 USD
          currency: 'usd',
          status: 'COMPLETED'
        }
      })
      
      console.log(`✅ 创建购买记录: ${purchase.id}`)
    }
    
    // 查找产品映射
    const productMapping = await prisma.productCourseMapping.findUnique({
      where: { stripeProductId: purchasedProductId },
      include: {
        course: true
      }
    })
    
    if (!productMapping) {
      console.log('❌ 找不到产品映射关系')
      return
    }
    
    console.log(`✅ 找到产品映射: ${purchasedProductId} -> ${productMapping.course.title}`)
    
    // 检查用户是否已有课程访问权限
    const existingAccess = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: productMapping.courseId
        }
      }
    })
    
    if (existingAccess) {
      console.log('⚠️  用户已有此课程的访问权限')
      console.log(`访问方式: ${existingAccess.accessMethod}`)
      console.log(`授权时间: ${existingAccess.createdAt}`)
    } else {
      // 授权课程访问
      const userCourse = await prisma.userCourse.create({
        data: {
          userId: user.id,
          courseId: productMapping.courseId,
          accessMethod: 'PURCHASED'
        }
      })
      
      console.log(`✅ 授权课程访问: ${userCourse.id}`)
    }
    
    // 最终验证
    console.log('\n=== 最终验证 ===')
    const finalUser = await prisma.user.findUnique({
      where: { email: 'slashui@live.cn' },
      include: {
        purchases: true,
        userCourses: {
          include: {
            course: true
          }
        }
      }
    })
    
    console.log(`用户: ${finalUser.email}`)
    console.log(`购买记录数: ${finalUser.purchases.length}`)
    console.log(`课程访问数: ${finalUser.userCourses.length}`)
    
    if (finalUser.purchases.length > 0) {
      console.log('\n购买记录:')
      finalUser.purchases.forEach(purchase => {
        console.log(`  - 产品ID: ${purchase.productId}`)
        console.log(`    状态: ${purchase.status}`)
        console.log(`    金额: ${purchase.amount / 100} ${purchase.currency.toUpperCase()}`)
        console.log(`    时间: ${purchase.createdAt}`)
      })
    }
    
    if (finalUser.userCourses.length > 0) {
      console.log('\n课程访问:')
      finalUser.userCourses.forEach(userCourse => {
        console.log(`  - 课程: ${userCourse.course.title} (${userCourse.course.courseId})`)
        console.log(`    访问方式: ${userCourse.accessMethod}`)
        console.log(`    授权时间: ${userCourse.createdAt}`)
      })
    }
    
    console.log('\n🎉 模拟购买流程完成！用户现在应该能看到购买的课程了。')
    
  } catch (error) {
    console.error('❌ 模拟购买失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

simulateStripePurchase()