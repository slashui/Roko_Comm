const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// 课程和Stripe产品ID的映射关系
const courseStripeMapping = [
  {
    courseId: 'chuhai',
    stripeId: 'prod_Sz6yQ0GGtarJ0w',
    title: '出海课程'
  },
  {
    courseId: 'aicourse', 
    stripeId: 'prod_Sz6yZ35XCGAKTj',
    title: 'AI编程实战营'
  },
  {
    courseId: 'saas',
    stripeId: 'prod_Sz6zn0rSjJmeHt', 
    title: 'SaaS脚手架'
  }
]

async function updateCourseStripeIds() {
  try {
    console.log('开始创建/更新课程的Stripe产品ID...')
    
    for (const mapping of courseStripeMapping) {
      console.log(`\n处理课程: ${mapping.title} (courseId: ${mapping.courseId})`)
      
      // 检查课程是否存在
      const existingCourse = await prisma.course.findUnique({
        where: {
          courseId: mapping.courseId
        }
      })
      
      if (!existingCourse) {
        console.log(`📝 课程不存在，正在创建: ${mapping.courseId}`)
        
        // 检查stripeId是否已经被其他课程使用
        const courseWithStripeId = await prisma.course.findUnique({
          where: {
            stripeId: mapping.stripeId
          }
        })
        
        if (courseWithStripeId) {
          console.log(`⚠️  Stripe ID ${mapping.stripeId} 已被课程 ${courseWithStripeId.courseId} 使用`)
          continue
        }
        
        // 创建新课程
        const newCourse = await prisma.course.create({
          data: {
            courseId: mapping.courseId,
            title: mapping.title,
            description: `${mapping.title}的详细介绍`,
            stripeId: mapping.stripeId,
            status: 'PUBLISHED',
            price: 0.0
          }
        })
        
        console.log(`✅ 成功创建课程:`)
        console.log(`   课程ID: ${newCourse.courseId}`)
        console.log(`   课程标题: ${newCourse.title}`)
        console.log(`   Stripe产品ID: ${newCourse.stripeId}`)
        console.log(`   状态: ${newCourse.status}`)
      } else {
        // 检查stripeId是否已经被其他课程使用
        const courseWithStripeId = await prisma.course.findUnique({
          where: {
            stripeId: mapping.stripeId
          }
        })
        
        if (courseWithStripeId && courseWithStripeId.courseId !== mapping.courseId) {
          console.log(`⚠️  Stripe ID ${mapping.stripeId} 已被课程 ${courseWithStripeId.courseId} 使用`)
          continue
        }
        
        // 更新课程的stripeId
        const updatedCourse = await prisma.course.update({
          where: {
            courseId: mapping.courseId
          },
          data: {
            stripeId: mapping.stripeId
          }
        })
        
        console.log(`✅ 成功更新课程:`)
        console.log(`   课程ID: ${updatedCourse.courseId}`)
        console.log(`   课程标题: ${updatedCourse.title}`)
        console.log(`   Stripe产品ID: ${updatedCourse.stripeId}`)
      }
    }
    
    console.log('\n🎉 所有课程的Stripe产品ID更新完成！')
    
    // 显示最终结果
    console.log('\n📋 最终课程列表:')
    const allCourses = await prisma.course.findMany({
      select: {
        courseId: true,
        title: true,
        stripeId: true
      },
      orderBy: {
        courseId: 'asc'
      }
    })
    
    allCourses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`)
      console.log(`   课程ID: ${course.courseId}`)
      console.log(`   Stripe产品ID: ${course.stripeId || '未设置'}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ 更新失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateCourseStripeIds()