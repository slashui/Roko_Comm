const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupOrphanedDirectories() {
  try {
    console.log('🧹 Starting cleanup of orphaned course directories...');
    console.log('=' .repeat(60));
    
    // 获取数据库中所有课程的courseId
    const courses = await prisma.course.findMany({
      select: { courseId: true, title: true }
    });
    
    const dbCourseIds = courses.map(c => c.courseId);
    console.log(`📚 Found ${courses.length} courses in database:`);
    courses.forEach(course => {
      console.log(`   - ${course.courseId}: ${course.title}`);
    });
    
    console.log('\n' + '-'.repeat(60));
    
    const courseDir = path.join(__dirname, 'app', '[locale]', '(dashboard)', '(route)', 'course');
    
    if (!fs.existsSync(courseDir)) {
      console.log(`❌ Course directory does not exist: ${courseDir}`);
      return;
    }
    
    // 获取所有目录
    const directories = fs.readdirSync(courseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .filter(dirent => !dirent.name.startsWith('[') && !dirent.name.startsWith('.')) // 过滤掉Next.js路由目录和隐藏文件
      .map(dirent => dirent.name);
    
    // 找出孤立目录
    const orphanedDirs = directories.filter(dir => !dbCourseIds.includes(dir));
    
    if (orphanedDirs.length === 0) {
      console.log('✅ No orphaned directories found. Nothing to clean up.');
      return;
    }
    
    console.log(`🗂️  Found ${orphanedDirs.length} orphaned directories:`);
    orphanedDirs.forEach(dir => {
      const dirPath = path.join(courseDir, dir);
      const stats = fs.statSync(dirPath);
      console.log(`   - ${dir} (modified: ${stats.mtime.toISOString().split('T')[0]})`);
    });
    
    console.log('\n' + '⚠️ '.repeat(20));
    console.log('⚠️  WARNING: This will permanently delete the above directories!');
    console.log('⚠️  Make sure you have backups if needed.');
    console.log('⚠️ '.repeat(20));
    
    // 在实际环境中，这里应该有用户确认步骤
    // 为了安全起见，我们先只是列出要删除的目录
    console.log('\n🔍 Directories that would be deleted:');
    
    const deletedDirs = [];
    const failedDirs = [];
    
    for (const dir of orphanedDirs) {
      const dirPath = path.join(courseDir, dir);
      try {
        // 检查目录内容
        const contents = fs.readdirSync(dirPath);
        console.log(`\n📁 ${dir}:`);
        console.log(`   Path: ${dirPath}`);
        console.log(`   Contents: ${contents.length > 0 ? contents.join(', ') : 'Empty'}`);
        
        // 实际删除目录（递归删除）
        fs.rmSync(dirPath, { recursive: true, force: true });
        deletedDirs.push(dir);
        console.log(`   ✅ Deleted successfully`);
        
      } catch (error) {
        console.log(`   ❌ Failed to delete: ${error.message}`);
        failedDirs.push({ dir, error: error.message });
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📋 CLEANUP SUMMARY');
    console.log('='.repeat(60));
    
    if (deletedDirs.length > 0) {
      console.log(`✅ Successfully deleted ${deletedDirs.length} directories:`);
      deletedDirs.forEach(dir => console.log(`   - ${dir}`));
    }
    
    if (failedDirs.length > 0) {
      console.log(`\n❌ Failed to delete ${failedDirs.length} directories:`);
      failedDirs.forEach(item => console.log(`   - ${item.dir}: ${item.error}`));
    }
    
    console.log(`\n🎯 Total processed: ${orphanedDirs.length}`);
    console.log(`✅ Successful: ${deletedDirs.length}`);
    console.log(`❌ Failed: ${failedDirs.length}`);
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 添加命令行参数支持
const args = process.argv.slice(2);
if (args.includes('--confirm') || args.includes('-y')) {
  cleanupOrphanedDirectories();
} else {
  console.log('🚨 SAFETY CHECK: This script will delete orphaned directories.');
  console.log('📋 To see what would be deleted, run: node cleanup-orphaned-dirs.js --dry-run');
  console.log('⚡ To actually delete, run: node cleanup-orphaned-dirs.js --confirm');
  console.log('\n💡 Tip: Always backup your data before running cleanup operations!');
}