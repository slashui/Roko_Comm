const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testUserCourses() {
  try {
    console.log('Testing database connection...');
    
    // 查看所有用户
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    console.log('\n=== All Users ===');
    console.log(users);
    
    // 查看所有课程
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        courseId: true,
        status: true
      }
    });
    console.log('\n=== All Courses ===');
    console.log(courses);
    
    // 查看所有UserCourse记录
    const userCourses = await prisma.userCourse.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            courseId: true,
            status: true
          }
        }
      }
    });
    console.log('\n=== All UserCourse Records ===');
    console.log(JSON.stringify(userCourses, null, 2));
    
    // 如果有用户，测试特定用户的课程查询
    if (users.length > 0) {
      const testUserId = users[0].id;
      console.log(`\n=== Testing query for user: ${testUserId} ===`);
      
      const userCoursesForUser = await prisma.userCourse.findMany({
        where: { userId: testUserId },
        include: {
          course: true
        }
      });
      console.log('Result:', JSON.stringify(userCoursesForUser, null, 2));
    }
    
  } catch (error) {
    console.error('Database test error:', error);
    console.error('Error stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testUserCourses();