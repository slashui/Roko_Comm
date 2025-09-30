const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkAllUsersPurchases() {
  try {
    console.log('🔍 检查所有用户和购买记录...')
    
    // 1. 检查所有用户
    console.log('\n1. 检查所有用户:')
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`找到 ${users.length} 个用户:`)
    users.forEach((user, index) => {
      console.log(`\n用户 ${index + 1}:`)
      console.log(`  ID: ${user.id}`)
      console.log(`  邮箱: ${user.email}`)
      console.log(`  姓名: ${user.name}`)
      console.log(`  角色: ${user.role}`)
      console.log(`  创建时间: ${user.createdAt.toLocaleString('zh-CN')}`)
    })
    
    // 2. 检查所有Purchase表中的购买记录
    console.log('\n2. 检查所有Purchase表中的购买记录:')
    const purchases = await prisma.purchase.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`找到 ${purchases.length} 条购买记录:`)
    purchases.forEach((purchase, index) => {
      console.log(`\n购买记录 ${index + 1}:`)
      console.log(`  ID: ${purchase.id}`)
      console.log(`  用户ID: ${purchase.userId || '无（游客购买）'}`)
      console.log(`  用户邮箱: ${purchase.user?.email || purchase.customerEmail}`)
      console.log(`  用户姓名: ${purchase.user?.name || '未知'}`)
      console.log(`  客户邮箱: ${purchase.customerEmail}`)
      console.log(`  产品ID: ${purchase.productId}`)
      console.log(`  Stripe会话ID: ${purchase.stripeSessionId}`)
      console.log(`  Stripe价格ID: ${purchase.stripePriceId}`)
      console.log(`  金额: ${purchase.amount} ${purchase.currency}`)
      console.log(`  状态: ${purchase.status}`)
      console.log(`  创建时间: ${purchase.createdAt.toLocaleString('zh-CN')}`)
      console.log(`  更新时间: ${purchase.updatedAt.toLocaleString('zh-CN')}`)
    })
    
    // 3. 检查orderlist表中的订单记录（旧表）
    console.log('\n3. 检查orderlist表中的订单记录:')
    const orders = await prisma.orderlist.findMany({
      orderBy: { addtime: 'desc' }
    })
    
    console.log(`找到 ${orders.length} 条订单记录:`)
    orders.forEach((order, index) => {
      console.log(`\n订单记录 ${index + 1}:`)
      console.log(`  ID: ${order.id}`)
      console.log(`  姓名: ${order.name}`)
      console.log(`  邮箱: ${order.email}`)
      console.log(`  GitHub用户名: ${order.githubusername}`)
      console.log(`  会话ID: ${order.checkout_session_id}`)
      console.log(`  价格ID: ${order.priceid}`)
      console.log(`  产品名称: ${order.productname}`)
      console.log(`  金额: ${order.amount}`)
      console.log(`  添加时间: ${order.addtime}`)
    })
    
    // 4. 检查用户课程关系
    console.log('\n4. 检查所有用户课程关系:')
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
    
    console.log(`找到 ${userCourses.length} 个用户课程关系:`)
    userCourses.forEach((uc, index) => {
      console.log(`\n用户课程关系 ${index + 1}:`)
      console.log(`  用户邮箱: ${uc.user.email}`)
      console.log(`  用户姓名: ${uc.user.name}`)
      console.log(`  课程ID: ${uc.course.courseId}`)
      console.log(`  课程标题: ${uc.course.title}`)
      console.log(`  Stripe产品ID: ${uc.course.stripeId}`)
      console.log(`  获取方式: ${uc.accessMethod}`)
      console.log(`  授权时间: ${uc.grantedAt.toLocaleString('zh-CN')}`)
      if (uc.purchase) {
        console.log(`  关联购买: ${uc.purchase.id} (${uc.purchase.status}, ${uc.purchase.amount})`)
      }
    })
    
    // 5. 按邮箱分组显示购买情况
    console.log('\n5. 按邮箱分组的购买情况:')
    const emailGroups = {}
    
    // 收集Purchase记录
    purchases.forEach(purchase => {
      const email = purchase.user?.email || purchase.customerEmail
      if (email) {
        if (!emailGroups[email]) {
          emailGroups[email] = { purchases: [], orders: [], courses: [] }
        }
        emailGroups[email].purchases.push(purchase)
      }
    })
    
    // 收集orderlist记录
    orders.forEach(order => {
      if (order.email) {
        if (!emailGroups[order.email]) {
          emailGroups[order.email] = { purchases: [], orders: [], courses: [] }
        }
        emailGroups[order.email].orders.push(order)
      }
    })
    
    // 收集课程权限
    userCourses.forEach(uc => {
      const email = uc.user.email
      if (email) {
        if (!emailGroups[email]) {
          emailGroups[email] = { purchases: [], orders: [], courses: [] }
        }
        emailGroups[email].courses.push(uc)
      }
    })
    
    Object.keys(emailGroups).forEach(email => {
      const group = emailGroups[email]
      console.log(`\n📧 ${email}:`)
      console.log(`  Purchase记录: ${group.purchases.length} 条`)
      console.log(`  orderlist记录: ${group.orders.length} 条`)
      console.log(`  课程权限: ${group.courses.length} 个`)
      
      if (group.purchases.length > 0) {
        console.log(`  最新购买状态: ${group.purchases[0].status}`)
      }
    })
    
    // 6. 总结
    console.log('\n🎯 总结:')
    console.log(`- 总用户数: ${users.length}`)
    console.log(`- 总购买记录(Purchase): ${purchases.length}`)
    console.log(`- 总订单记录(orderlist): ${orders.length}`)
    console.log(`- 总课程权限: ${userCourses.length}`)
    console.log(`- 有购买活动的邮箱: ${Object.keys(emailGroups).length}`)
    
  } catch (error) {
    console.error('❌ 检查失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAllUsersPurchases()