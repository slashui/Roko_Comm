const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function grantCourseAccess() {
  try {
    console.log('为用户 slashui@live.cn 授权课程访问...')
    
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email: 'slashui@live.cn' }
    })
    
    if (!user) {
      console.log('❌ 用户 slashui@live.cn 不存在')
      return
    }
    
    console.log(`✅ 找到用户: ${user.email} (ID: ${user.id})`)
    
    // 查找所有课程
    const courses = await prisma.course.findMany()
    console.log(`数据库中有 ${courses.length} 个课程`)
    
    if (courses.length === 0) {
      console.log('❌ 数据库中没有课程')
      return
    }
    
    // 为用户授权所有课程
    for (const course of courses) {
      // 检查是否已经有访问权限
      const existingAccess = await prisma.userCourse.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id
          }
        }
      })
      
      if (existingAccess) {
        console.log(`⚠️  用户已有课程 "${course.title}" 的访问权限`)
        continue
      }
      
      // 创建课程访问权限
      await prisma.userCourse.create({
        data: {
          userId: user.id,
          courseId: course.id,
          accessMethod: 'GRANTED'
        }
      })
      
      console.log(`✅ 已授权课程: ${course.title}`)
    }
    
    // 验证授权结果
    const userCourses = await prisma.userCourse.findMany({
      where: { userId: user.id },
      include: {
        course: {
          select: {
            title: true,
            courseId: true
          }
        }
      }
    })
    
    console.log('\n🎉 授权完成！用户现在可以访问以下课程:')
    userCourses.forEach(uc => {
      console.log(`   - ${uc.course.title} (${uc.course.courseId})`)
    })
    
  } catch (error) {
    console.error('❌ 授权失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

grantCourseAccess()