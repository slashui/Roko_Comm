const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function cleanupOrphanedCourses() {
  try {
    console.log('🧹 开始清理孤立的课程数据库记录...');
    console.log('='.repeat(60));
    
    // 获取所有课程
    const courses = await prisma.course.findMany({
      include: {
        userCourses: {
          include: {
            user: {
              select: { email: true, name: true }
            }
          }
        },
        inviteCodeCourses: {
          include: {
            inviteCode: true
          }
        }
      }
    });
    
    console.log(`📚 数据库中找到 ${courses.length} 个课程`);
    
    const courseDir = path.join(__dirname, 'app', '[locale]', '(dashboard)', '(route)', 'course');
    const orphanedCourses = [];
    
    // 检查每个课程的目录是否存在
    for (const course of courses) {
      const coursePath = path.join(courseDir, course.courseId);
      const exists = fs.existsSync(coursePath);
      
      if (!exists) {
        orphanedCourses.push(course);
        console.log(`\n❌ 孤立课程发现:`);
        console.log(`   课程名: ${course.title}`);
        console.log(`   课程ID: ${course.courseId}`);
        console.log(`   数据库ID: ${course.id}`);
        console.log(`   状态: ${course.status}`);
        console.log(`   注册用户数: ${course.userCourses.length}`);
        console.log(`   邀请码数: ${course.inviteCodeCourses.length}`);
        console.log(`   创建时间: ${course.createdAt}`);
        
        if (course.userCourses.length > 0) {
          console.log(`   ⚠️  警告: 该课程有 ${course.userCourses.length} 个注册用户!`);
          course.userCourses.forEach((uc, index) => {
            console.log(`      ${index + 1}. ${uc.user.email || uc.user.name || 'Unknown'}`);
          });
        }
      }
    }
    
    if (orphanedCourses.length === 0) {
      console.log('\n✅ 没有发现孤立的课程记录');
      return;
    }
    
    console.log('\n' + '⚠️ '.repeat(20));
    console.log('⚠️  警告: 即将删除以下孤立的课程数据!');
    console.log('⚠️  这将永久删除课程及其所有相关数据!');
    console.log('⚠️ '.repeat(20));
    
    // 开始删除操作
    const deletionResults = [];
    
    for (const course of orphanedCourses) {
      console.log(`\n🗑️  正在删除课程: ${course.title} (ID: ${course.courseId})`);
      
      try {
        // 使用事务确保数据一致性
        await prisma.$transaction(async (tx) => {
          // 1. 删除用户课程关联
          if (course.userCourses.length > 0) {
            await tx.userCourse.deleteMany({
              where: { courseId: course.courseId }
            });
            console.log(`   ✅ 删除了 ${course.userCourses.length} 个用户课程关联`);
          }
          
          // 2. 删除邀请码课程关联
          if (course.inviteCodeCourses.length > 0) {
            await tx.inviteCodeCourse.deleteMany({
              where: { courseId: course.courseId }
            });
            console.log(`   ✅ 删除了 ${course.inviteCodeCourses.length} 个邀请码课程关联`);
          }
          
          // 3. 删除课程记录
          await tx.course.delete({
            where: { id: course.id }
          });
          console.log(`   ✅ 删除了课程记录`);
        });
        
        deletionResults.push({
          courseId: course.courseId,
          title: course.title,
          success: true,
          userCoursesDeleted: course.userCourses.length,
          inviteCodesDeleted: course.inviteCodeCourses.length
        });
        
      } catch (error) {
        console.log(`   ❌ 删除失败: ${error.message}`);
        deletionResults.push({
          courseId: course.courseId,
          title: course.title,
          success: false,
          error: error.message
        });
      }
    }
    
    // 显示删除结果摘要
    console.log('\n' + '='.repeat(60));
    console.log('📋 删除操作摘要');
    console.log('='.repeat(60));
    
    const successful = deletionResults.filter(r => r.success);
    const failed = deletionResults.filter(r => !r.success);
    
    if (successful.length > 0) {
      console.log(`\n✅ 成功删除 ${successful.length} 个课程:`);
      successful.forEach(result => {
        console.log(`   - ${result.courseId}: ${result.title}`);
        console.log(`     用户关联: ${result.userCoursesDeleted}, 邀请码关联: ${result.inviteCodesDeleted}`);
      });
    }
    
    if (failed.length > 0) {
      console.log(`\n❌ 删除失败 ${failed.length} 个课程:`);
      failed.forEach(result => {
        console.log(`   - ${result.courseId}: ${result.title}`);
        console.log(`     错误: ${result.error}`);
      });
    }
    
    console.log(`\n🎯 总计处理: ${orphanedCourses.length}`);
    console.log(`✅ 成功: ${successful.length}`);
    console.log(`❌ 失败: ${failed.length}`);
    
    let totalUserCourses = 0;
    let totalInviteCodes = 0;
    successful.forEach(result => {
      totalUserCourses += result.userCoursesDeleted;
      totalInviteCodes += result.inviteCodesDeleted;
    });
    
    console.log(`\n📊 删除的相关数据:`);
    console.log(`   用户课程关联: ${totalUserCourses}`);
    console.log(`   邀请码关联: ${totalInviteCodes}`);
    
  } catch (error) {
    console.error('❌ 清理过程中发生错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 添加命令行参数支持
const args = process.argv.slice(2);
if (args.includes('--confirm') || args.includes('-y')) {
  cleanupOrphanedCourses();
} else {
  console.log('🚨 安全检查: 此脚本将删除孤立的课程数据库记录。');
  console.log('📋 要查看将被删除的内容，请运行: node cleanup-orphaned-courses.js --dry-run');
  console.log('⚡ 要实际执行删除，请运行: node cleanup-orphaned-courses.js --confirm');
  console.log('\n💡 提示: 删除操作前请务必备份数据库!');
  console.log('\n⚠️  特别注意: 如果课程有注册用户，删除前请考虑数据迁移或用户通知!');
}