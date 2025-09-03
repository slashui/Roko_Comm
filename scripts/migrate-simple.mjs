import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function migrate_course_data() {
  try {
    console.log('开始迁移课程数据...');
    
    // 读取课程数据
    const courseFilePath = path.join(__dirname, '../public/course.json');
    const courseData = JSON.parse(fs.readFileSync(courseFilePath, 'utf8'));
    
    console.log(`读取到课程: ${courseData.title}`);
    
    // 创建课程
    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description || null,
      }
    });
    
    console.log(`✅ 创建课程: ${course.title}`);
    
    // 创建章节和课时
    for (let i = 0; i < courseData.chapters.length; i++) {
      const chapterData = courseData.chapters[i];
      
      // 映射状态
      const statusMapping = {
        'completed': 'COMPLETED',
        'draft': 'DRAFT',
        'published': 'PUBLISHED'
      };
      
      // 映射角色权限
      const roleMapping = {
        'free': 'FREE',
        'prime': 'PRIME', 
        'vip': 'VIP'
      };
      
      const chapter = await prisma.chapter.create({
        data: {
          chapterNumber: chapterData.id,
          title: chapterData.title,
          description: chapterData.description,
          status: statusMapping[chapterData.status?.toLowerCase()] || 'COMPLETED',
          requiredRole: roleMapping[chapterData.requiredRole?.toLowerCase()] || 'FREE',
          order: i + 1,
          courseId: course.id,
        }
      });
      
      console.log(`  ✅ 创建章节 ${i + 1}: ${chapter.title}`);
      
      // 创建课时
      for (let j = 0; j < chapterData.lessons.length; j++) {
        const lessonData = chapterData.lessons[j];
        
        await prisma.lesson.create({
          data: {
            title: lessonData.title,
            duration: lessonData.duration,
            url: lessonData.url,
            previewUrl: lessonData.previewUrl || null,
            isPreview: lessonData.isPreview || false,
            requiredRole: roleMapping[lessonData.requiredRole?.toLowerCase()] || 'FREE',
            videoUrl: lessonData.videoUrl || null,
            order: j + 1,
            chapterId: chapter.id,
          }
        });
        
        console.log(`    ✅ 创建课时 ${j + 1}: ${lessonData.title}`);
      }
    }
    
    console.log('🎉 课程数据迁移完成!');
    
    // 显示统计信息
    const courseCount = await prisma.course.count();
    const chapterCount = await prisma.chapter.count();
    const lessonCount = await prisma.lesson.count();
    
    console.log(`📊 统计信息:`);
    console.log(`   课程总数: ${courseCount}`);
    console.log(`   章节总数: ${chapterCount}`);
    console.log(`   课时总数: ${lessonCount}`);
    
  } catch (error) {
    console.error('❌ 迁移过程中出错:', error);
    console.error('错误详情:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行迁移
migrate_course_data();