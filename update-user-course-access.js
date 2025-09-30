const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateUserCourseAccess() {
  try {
    console.log('更新用户课程访问记录，关联到购买记录...')
    
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email: 'slashui@live.cn' }
    })
    
    if (!user) {
      console.log('❌ 用户不存在')
      return
    }
    
    console.log(`✅ 找到用户: ${user.email} (${user.id})`)
    
    // 查找用户的购买记录
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId: user.id,
        status: 'COMPLETED'
      }
    })
    
    if (!purchase) {
      console.log('❌ 找不到已完成的购买记录')
      return
    }
    
    console.log(`✅ 找到购买记录: ${purchase.id} (产品: ${purchase.productId})`)
    
    // 查找产品映射
    const productMapping = await prisma.productCourseMapping.findUnique({
      where: { stripeProductId: purchase.productId },
      include: { course: true }
    })
    
    if (!productMapping) {
      console.log('❌ 找不到产品映射关系')
      return
    }
    
    console.log(`✅ 找到产品映射: ${purchase.productId} -> ${productMapping.course.title}`)
    
    // 查找现有的用户课程记录
    const existingUserCourse = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: productMapping.courseId
        }
      }
    })
    
    if (!existingUserCourse) {
      console.log('❌ 找不到用户课程访问记录')
      return
    }
    
    console.log(`✅ 找到用户课程记录: ${existingUserCourse.id}`)
    console.log(`当前访问方式: ${existingUserCourse.accessMethod}`)
    console.log(`当前购买ID: ${existingUserCourse.purchaseId || '无'}`)
    
    // 更新用户课程记录
    const updatedUserCourse = await prisma.userCourse.update({
      where: {
        id: existingUserCourse.id
      },
      data: {
        accessMethod: 'PURCHASED',
        purchaseId: purchase.id
      }
    })
    
    console.log(`✅ 更新用户课程记录成功`)
    console.log(`新访问方式: ${updatedUserCourse.accessMethod}`)
    console.log(`关联购买ID: ${updatedUserCourse.purchaseId}`)
    
    // 最终验证
    console.log('\n=== 最终验证 ===')
    const finalUser = await prisma.user.findUnique({
      where: { email: 'slashui@live.cn' },
      include: {
        purchases: true,
        userCourses: {
          include: {
            course: true,
            purchase: true
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
        console.log(`    授权时间: ${userCourse.grantedAt}`)
        if (userCourse.purchase) {
          console.log(`    关联购买: ${userCourse.purchase.id} (${userCourse.purchase.productId})`)
        }
      })
    }
    
    console.log('\n🎉 用户课程访问记录更新完成！')
    console.log('现在用户的课程访问是通过购买获得的，完全符合实际购买流程。')
    
  } catch (error) {
    console.error('❌ 更新失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateUserCourseAccess()