const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testSpecificUser() {
  try {
    const userId = 'cmeleq9gx0003eyt19azzflqj';
    console.log('Testing query for userId:', userId);
    
    const result = await prisma.userCourse.findMany({
      where: { userId },
      include: {
        course: true
      }
    });
    
    console.log('Query result:', JSON.stringify(result, null, 2));
    console.log('Number of courses found:', result.length);
    
  } catch (error) {
    console.error('Error:', error);
    console.error('Error stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testSpecificUser();