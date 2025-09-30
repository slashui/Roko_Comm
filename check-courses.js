const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCourses() {
  try {
    console.log('🔍 查看数据库中的课程...');
    
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        courseId: true,
        title: true,
        status: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`\n📚 数据库中共有 ${courses.length} 个课程:`);
    courses.forEach((course, index) => {
      console.log(`${index + 1}. courseId: "${course.courseId}", title: "${course.title}", status: ${course.status}`);
    });
    
  } catch (error) {
    console.error('❌ 查询失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCourses();