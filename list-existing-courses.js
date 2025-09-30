const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function listExistingCourses() {
  try {
    console.log('查询数据库中现有的课程...')
    
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        courseId: true,
        title: true,
        description: true,
        stripeId: true,
        status: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    
    if (courses.length === 0) {
      console.log('❌ 数据库中没有找到任何课程')
      return
    }
    
    console.log(`✅ 找到 ${courses.length} 个课程:`)
    console.log('')
    
    courses.forEach((course, index) => {
      console.log(`${index + 1}. 课程信息:`)
      console.log(`   ID: ${course.id}`)
      console.log(`   课程ID: ${course.courseId}`)
      console.log(`   标题: ${course.title}`)
      console.log(`   描述: ${course.description || '无描述'}`)
      console.log(`   Stripe产品ID: ${course.stripeId || '未设置'}`)
      console.log(`   状态: ${course.status}`)
      console.log(`   创建时间: ${course.createdAt.toLocaleString('zh-CN')}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ 查询失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listExistingCourses()