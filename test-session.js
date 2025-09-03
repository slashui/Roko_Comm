// 测试当前session数据的脚本
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testSession() {
  try {
    console.log('=== 测试Session数据 ===');
    
    // 查找所有用户
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
    
    console.log('\n所有用户:');
    users.forEach(user => {
      console.log(`- ID: ${user.id}, Email: ${user.email}, Name: ${user.name}, Role: ${user.role}`);
    });
    
    // 查找有课程的用户
    const usersWithCourses = await prisma.userCourse.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            courseId: true
          }
        }
      }
    });
    
    console.log('\n有课程的用户:');
    usersWithCourses.forEach(userCourse => {
      console.log(`- 用户: ${userCourse.user.email} (ID: ${userCourse.user.id})`);
      console.log(`  课程: ${userCourse.course.title} (ID: ${userCourse.course.id})`);
    });
    
  } catch (error) {
    console.error('测试失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSession();