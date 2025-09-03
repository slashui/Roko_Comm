const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// 课程目录路径
const COURSE_BASE_PATH = path.join(process.cwd(), 'app/[locale]/(dashboard)/(route)/course');

/**
 * 检查课程目录是否存在
 * @param {string} courseId - 课程ID
 * @returns {boolean} - 目录是否存在
 */
function courseDirectoryExists(courseId) {
  const coursePath = path.join(COURSE_BASE_PATH, courseId);
  return fs.existsSync(coursePath) && fs.statSync(coursePath).isDirectory();
}

/**
 * 获取所有孤立的课程（数据库中存在但文件系统中不存在）
 * @returns {Array} - 孤立课程列表
 */
async function findOrphanedCourses() {
  console.log('🔍 正在检查数据库中的所有课程...');
  
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      _count: {
        select: {
          userCourses: true,
          inviteCodeCourses: true
        }
      }
    }
  });
  
  console.log(`📊 数据库中共找到 ${courses.length} 个课程`);
  
  const orphanedCourses = [];
  const validCourses = [];
  
  for (const course of courses) {
    const directoryExists = courseDirectoryExists(course.id);
    
    if (!directoryExists) {
      orphanedCourses.push(course);
      console.log(`❌ 孤立课程: ${course.id} - "${course.title}" (用户: ${course._count.userCourses}, 邀请码: ${course._count.inviteCodeCourses})`);
    } else {
      validCourses.push(course);
      console.log(`✅ 有效课程: ${course.id} - "${course.title}"`);
    }
  }
  
  return { orphanedCourses, validCourses };
}

/**
 * 删除孤立的课程记录
 * @param {Array} orphanedCourses - 孤立课程列表
 */
async function deleteOrphanedCourses(orphanedCourses) {
  if (orphanedCourses.length === 0) {
    console.log('✨ 没有发现孤立的课程记录');
    return;
  }
  
  console.log(`\n⚠️  发现 ${orphanedCourses.length} 个孤立的课程记录:`);
  
  for (const course of orphanedCourses) {
    console.log(`   - ${course.id}: "${course.title}" (${course._count.userCourses} 个用户, ${course._count.inviteCodeCourses} 个邀请码)`);
  }
  
  console.log('\n🚨 警告: 删除这些课程将会:');
  console.log('   1. 永久删除课程记录');
  console.log('   2. 删除所有用户与这些课程的关联');
  console.log('   3. 删除所有邀请码与这些课程的关联');
  console.log('   4. 这个操作不可逆转!');
  
  // 检查是否有确认参数
  const shouldDelete = process.argv.includes('--confirm') || process.argv.includes('-y');
  
  if (!shouldDelete) {
    console.log('\n💡 如果确认要删除这些孤立的课程记录，请使用 --confirm 或 -y 参数:');
    console.log('   node cleanup-orphaned-courses-remote.js --confirm');
    return;
  }
  
  console.log('\n🗑️  开始删除孤立的课程记录...');
  
  let deletedCount = 0;
  let errorCount = 0;
  
  for (const course of orphanedCourses) {
    try {
      await prisma.$transaction(async (tx) => {
        // 删除用户课程关联
        const deletedUserCourses = await tx.userCourse.deleteMany({
          where: { courseId: course.id }
        });
        
        // 删除邀请码课程关联
        const deletedInviteCodeCourses = await tx.inviteCodeCourse.deleteMany({
          where: { courseId: course.id }
        });
        
        // 删除课程记录
        await tx.course.delete({
          where: { id: course.id }
        });
        
        console.log(`✅ 已删除课程 ${course.id}: "${course.title}" (用户关联: ${deletedUserCourses.count}, 邀请码关联: ${deletedInviteCodeCourses.count})`);
      });
      
      deletedCount++;
    } catch (error) {
      console.error(`❌ 删除课程 ${course.id} 时出错:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 删除完成:`);
  console.log(`   ✅ 成功删除: ${deletedCount} 个课程`);
  console.log(`   ❌ 删除失败: ${errorCount} 个课程`);
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('🚀 开始检查孤立的课程记录...');
    console.log(`📁 课程目录路径: ${COURSE_BASE_PATH}`);
    
    // 检查课程目录是否存在
    if (!fs.existsSync(COURSE_BASE_PATH)) {
      console.error(`❌ 课程目录不存在: ${COURSE_BASE_PATH}`);
      process.exit(1);
    }
    
    const { orphanedCourses, validCourses } = await findOrphanedCourses();
    
    console.log(`\n📈 统计结果:`);
    console.log(`   ✅ 有效课程: ${validCourses.length} 个`);
    console.log(`   ❌ 孤立课程: ${orphanedCourses.length} 个`);
    
    if (orphanedCourses.length > 0) {
      await deleteOrphanedCourses(orphanedCourses);
    } else {
      console.log('\n🎉 所有课程记录都有对应的目录，数据一致性良好!');
    }
    
  } catch (error) {
    console.error('❌ 执行过程中出现错误:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = {
  findOrphanedCourses,
  deleteOrphanedCourses,
  courseDirectoryExists
};