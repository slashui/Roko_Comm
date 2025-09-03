const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function testCourseConsistency() {
  try {
    console.log('🔍 Testing course consistency between database and file system...');
    console.log('=' .repeat(60));
    
    // 1. 查询数据库中的所有课程
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        courseId: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            userCourses: true
          }
        }
      }
    });
    
    console.log(`\n📊 Found ${courses.length} courses in database:`);
    console.log('-'.repeat(60));
    
    const courseDir = path.join(__dirname, 'app', '[locale]', '(dashboard)', '(route)', 'course');
    const inconsistentCourses = [];
    
    for (const course of courses) {
      console.log(`\n📚 Course: ${course.title}`);
      console.log(`   ID: ${course.id}`);
      console.log(`   CourseId: ${course.courseId}`);
      console.log(`   Status: ${course.status}`);
      console.log(`   Created: ${course.createdAt.toISOString()}`);
      console.log(`   Enrolled Users: ${course._count.userCourses}`);
      
      // 检查对应的文件系统目录是否存在
      const coursePath = path.join(courseDir, course.courseId);
      const exists = fs.existsSync(coursePath);
      
      if (exists) {
        console.log(`   ✅ Directory exists: ${coursePath}`);
        
        // 列出目录内容
        try {
          const files = fs.readdirSync(coursePath);
          console.log(`   📁 Files/Folders: ${files.join(', ')}`);
        } catch (err) {
          console.log(`   ⚠️  Cannot read directory: ${err.message}`);
        }
      } else {
        console.log(`   ❌ Directory missing: ${coursePath}`);
        inconsistentCourses.push({
          ...course,
          expectedPath: coursePath
        });
      }
    }
    
    // 2. 检查文件系统中存在但数据库中没有的目录
    console.log('\n' + '='.repeat(60));
    console.log('🔍 Checking for orphaned directories...');
    
    if (fs.existsSync(courseDir)) {
      const directories = fs.readdirSync(courseDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .filter(dirent => !dirent.name.startsWith('[') && !dirent.name.startsWith('.')) // 过滤掉Next.js路由目录和隐藏文件
        .map(dirent => dirent.name);
      
      const dbCourseIds = courses.map(c => c.courseId);
      const orphanedDirs = directories.filter(dir => !dbCourseIds.includes(dir));
      
      if (orphanedDirs.length > 0) {
        console.log(`\n📁 Found ${orphanedDirs.length} orphaned directories:`);
        orphanedDirs.forEach(dir => {
          console.log(`   🗂️  ${dir} (no corresponding database record)`);
        });
      } else {
        console.log('\n✅ No orphaned directories found.');
      }
    } else {
      console.log(`\n⚠️  Course directory does not exist: ${courseDir}`);
    }
    
    // 3. 总结报告
    console.log('\n' + '='.repeat(60));
    console.log('📋 SUMMARY REPORT');
    console.log('='.repeat(60));
    
    if (inconsistentCourses.length > 0) {
      console.log(`\n❌ Found ${inconsistentCourses.length} courses with missing directories:`);
      inconsistentCourses.forEach((course, index) => {
        console.log(`\n${index + 1}. Course: ${course.title}`);
        console.log(`   Database ID: ${course.id}`);
        console.log(`   Course ID: ${course.courseId}`);
        console.log(`   Expected Path: ${course.expectedPath}`);
        console.log(`   Enrolled Users: ${course._count.userCourses}`);
        console.log(`   Status: ${course.status}`);
        
        if (course._count.userCourses > 0) {
          console.log(`   ⚠️  WARNING: This course has ${course._count.userCourses} enrolled users!`);
        }
      });
      
      console.log('\n🔧 RECOMMENDED ACTIONS:');
      console.log('1. Create missing course directories');
      console.log('2. Or remove orphaned database records (if courses are no longer needed)');
      console.log('3. Check course metadata files and structure');
      
    } else {
      console.log('\n✅ All courses have corresponding directories!');
    }
    
    // 4. 特定课程ID检查（如果提供）
    const targetCourseId = process.argv[2];
    if (targetCourseId) {
      console.log('\n' + '='.repeat(60));
      console.log(`🎯 SPECIFIC COURSE CHECK: ${targetCourseId}`);
      console.log('='.repeat(60));
      
      const specificCourse = courses.find(c => c.courseId === targetCourseId || c.id === targetCourseId);
      if (specificCourse) {
        const coursePath = path.join(courseDir, specificCourse.courseId);
        console.log(`\n📚 Course Found: ${specificCourse.title}`);
        console.log(`   Database ID: ${specificCourse.id}`);
        console.log(`   Course ID: ${specificCourse.courseId}`);
        console.log(`   Directory Path: ${coursePath}`);
        console.log(`   Directory Exists: ${fs.existsSync(coursePath) ? '✅ YES' : '❌ NO'}`);
        
        if (!fs.existsSync(coursePath)) {
          console.log(`\n💡 This matches your error: "Course metadata not found: ${targetCourseId}"`);
          console.log('   The course exists in database but directory is missing.');
        }
      } else {
        console.log(`\n❌ Course with ID "${targetCourseId}" not found in database.`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error during course consistency check:');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行测试
console.log('🚀 Starting Course Consistency Check...');
console.log('Usage: node test-course.js [courseId]');
console.log('Example: node test-course.js 111');
console.log('');

testCourseConsistency();