const { PrismaClient } = require('@prisma/client')
const Stripe = require('stripe')

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

async function debugPurchaseIssue() {
  try {
    console.log('🔍 调试购买问题...')
    
    // 1. 检查用户信息
    console.log('\n1. 检查用户信息:')
    const user = await prisma.user.findUnique({
      where: { email: 'slashui@live.cn' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })
    
    if (!user) {
      console.log('❌ 用户不存在')
      return
    }
    
    console.log('✅ 用户信息:', user)
    
    // 2. 检查Purchase表中的购买记录
    console.log('\n2. 检查Purchase表中的购买记录:')
    const purchases = await prisma.purchase.findMany({
      where: {
        OR: [
          { userId: user.id },
          { customerEmail: user.email }
        ]
      },
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`找到 ${purchases.length} 条购买记录:`)
    purchases.forEach((purchase, index) => {
      console.log(`\n购买记录 ${index + 1}:`)
      console.log(`  ID: ${purchase.id}`)
      console.log(`  用户ID: ${purchase.userId || '无（游客购买）'}`)
      console.log(`  客户邮箱: ${purchase.customerEmail}`)
      console.log(`  产品ID: ${purchase.productId}`)
      console.log(`  Stripe会话ID: ${purchase.stripeSessionId}`)
      console.log(`  金额: ${purchase.amount} ${purchase.currency}`)
      console.log(`  状态: ${purchase.status}`)
      console.log(`  创建时间: ${purchase.createdAt.toLocaleString('zh-CN')}`)
    })
    
    // 3. 检查orderlist表中的订单记录（旧表）
    console.log('\n3. 检查orderlist表中的订单记录:')
    const orders = await prisma.orderlist.findMany({
      where: {
        email: user.email
      },
      orderBy: { addtime: 'desc' }
    })
    
    console.log(`找到 ${orders.length} 条订单记录:`)
    orders.forEach((order, index) => {
      console.log(`\n订单记录 ${index + 1}:`)
      console.log(`  ID: ${order.id}`)
      console.log(`  姓名: ${order.name}`)
      console.log(`  邮箱: ${order.email}`)
      console.log(`  会话ID: ${order.checkout_session_id}`)
      console.log(`  价格ID: ${order.priceid}`)
      console.log(`  产品名称: ${order.productname}`)
      console.log(`  金额: ${order.amount}`)
      console.log(`  添加时间: ${order.addtime}`)
    })
    
    // 4. 检查用户的课程权限
    console.log('\n4. 检查用户的课程权限:')
    const userCourses = await prisma.userCourse.findMany({
      where: { userId: user.id },
      include: {
        course: {
          select: {
            courseId: true,
            title: true,
            stripeId: true
          }
        },
        purchase: {
          select: {
            id: true,
            productId: true,
            status: true,
            amount: true
          }
        }
      },
      orderBy: { grantedAt: 'desc' }
    })
    
    console.log(`找到 ${userCourses.length} 个课程权限:`)
    userCourses.forEach((uc, index) => {
      console.log(`\n课程权限 ${index + 1}:`)
      console.log(`  课程ID: ${uc.course.courseId}`)
      console.log(`  课程标题: ${uc.course.title}`)
      console.log(`  Stripe产品ID: ${uc.course.stripeId}`)
      console.log(`  获取方式: ${uc.accessMethod}`)
      console.log(`  授权时间: ${uc.grantedAt.toLocaleString('zh-CN')}`)
      if (uc.purchase) {
        console.log(`  关联购买: ${uc.purchase.id} (${uc.purchase.status})`)
      }
    })
    
    // 5. 检查所有待认领的购买记录
    console.log('\n5. 检查所有待认领的购买记录:')
    const pendingPurchases = await prisma.purchase.findMany({
      where: {
        status: 'PENDING_CLAIM',
        customerEmail: user.email
      },
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`找到 ${pendingPurchases.length} 条待认领的购买记录:`)
    pendingPurchases.forEach((purchase, index) => {
      console.log(`\n待认领购买 ${index + 1}:`)
      console.log(`  ID: ${purchase.id}`)
      console.log(`  产品ID: ${purchase.productId}`)
      console.log(`  金额: ${purchase.amount} ${purchase.currency}`)
      console.log(`  客户邮箱: ${purchase.customerEmail}`)
      console.log(`  创建时间: ${purchase.createdAt.toLocaleString('zh-CN')}`)
    })
    
    // 6. 检查产品课程映射
    console.log('\n6. 检查产品课程映射:')
    const mappings = await prisma.productCourseMapping.findMany({
      include: {
        course: {
          select: {
            courseId: true,
            title: true
          }
        }
      }
    })
    
    console.log(`找到 ${mappings.length} 个产品课程映射:`)
    mappings.forEach((mapping, index) => {
      console.log(`\n映射 ${index + 1}:`)
      console.log(`  Stripe产品ID: ${mapping.stripeProductId}`)
      console.log(`  课程ID: ${mapping.course.courseId}`)
      console.log(`  课程标题: ${mapping.course.title}`)
      console.log(`  是否激活: ${mapping.isActive}`)
    })
    
    // 7. 总结问题
    console.log('\n🎯 问题总结:')
    if (purchases.length === 0 && orders.length === 0) {
      console.log('❌ 没有找到任何购买记录，可能的原因:')
      console.log('   1. 支付成功但webhook没有正确处理')
      console.log('   2. 订单创建API调用失败')
      console.log('   3. 数据库连接问题')
      console.log('   4. Stripe配置问题')
    } else if (purchases.length > 0) {
      const completedPurchases = purchases.filter(p => p.status === 'COMPLETED')
      const pendingPurchases = purchases.filter(p => p.status === 'PENDING_CLAIM')
      
      console.log(`✅ 找到购买记录: ${purchases.length} 条`)
      console.log(`   - 已完成: ${completedPurchases.length} 条`)
      console.log(`   - 待认领: ${pendingPurchases.length} 条`)
      
      if (pendingPurchases.length > 0) {
        console.log('💡 建议: 有待认领的购买记录，可能需要手动认领')
      }
    }
    
    if (userCourses.length === 0) {
      console.log('❌ 用户没有任何课程权限')
    } else {
      console.log(`✅ 用户有 ${userCourses.length} 个课程权限`)
    }
    
  } catch (error) {
    console.error('❌ 调试失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugPurchaseIssue()