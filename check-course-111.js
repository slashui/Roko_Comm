const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCourse111() {
  try {
    console.log('🔍 Checking for courseId "111" in database...');
    
    // 检查UserCourse表中是否有courseId为111的记录
    const userCourses = await prisma.userCourse.findMany({
      where: { courseId: '111' },
      include: { user: true }
    });
    
    console.log(`\n📚 UserCourse records with courseId "111": ${userCourses.length}`);
    if (userCourses.length > 0) {
      userCourses.forEach((uc, index) => {
        console.log(`   ${index + 1}. User: ${uc.user.email || uc.user.name || 'Unknown'} (ID: ${uc.userId})`);
        console.log(`      Enrolled: ${uc.createdAt}`);
        console.log(`      Progress: ${uc.progress || 0}%`);
      });
    }
    
    // 检查InviteCodeCourse表中是否有courseId为111的记录
    const inviteCodes = await prisma.inviteCodeCourse.findMany({
      where: { courseId: '111' },
      include: { inviteCode: true }
    });
    
    console.log(`\n🎫 InviteCodeCourse records with courseId "111": ${inviteCodes.length}`);
    if (inviteCodes.length > 0) {
      inviteCodes.forEach((ic, index) => {
        console.log(`   ${index + 1}. Invite Code: ${ic.inviteCode.code}`);
        console.log(`      Status: ${ic.inviteCode.status}`);
        console.log(`      Created: ${ic.inviteCode.createdAt}`);
      });
    }
    
    // 检查是否有类似的courseId（可能是输入错误）
    const similarCourses = await prisma.course.findMany({
      where: {
        OR: [
          { courseId: { contains: '11' } },
          { courseId: { startsWith: '1' } }
        ]
      }
    });
    
    console.log(`\n🔍 Similar courseIds found: ${similarCourses.length}`);
    if (similarCourses.length > 0) {
      similarCourses.forEach((course, index) => {
        console.log(`   ${index + 1}. CourseId: "${course.courseId}" - ${course.title}`);
      });
    }
    
    if (userCourses.length === 0 && inviteCodes.length === 0) {
      console.log('\n✅ No records found with courseId "111" in the database.');
      console.log('   This confirms that course "111" does not exist in the database.');
    } else {
      console.log('\n⚠️  Found orphaned records! Course "111" has related data but no course record.');
      console.log('   This could cause "Course metadata not found" errors.');
    }
    
  } catch (error) {
    console.error('❌ Error checking course 111:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCourse111();