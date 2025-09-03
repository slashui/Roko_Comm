const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function migrate_course_data() {
  try {
    // 读取课程数据
    const course_file_path = path.join(__dirname, '../public/course.json');
    const course_data = JSON.parse(fs.readFileSync(course_file_path, 'utf8'));
    
    console.log('开始迁移课程数据...');
    
    // 创建课程
    const course = await prisma.course.create({
      data: {
        title: course_data.title,
        description: course_data.description || null,
      }
    });
    
    console.log(`创建课程: ${course.title}`);
    
    // 创建章节和课时
    for (let i = 0; i < course_data.chapters.length; i++) {
      const chapter_data = course_data.chapters[i];
      
      // 映射状态
      const status_mapping = {
        'completed': 'COMPLETED',
        'draft': 'DRAFT',
        'published': 'PUBLISHED'
      };
      
      // 映射角色权限
      const role_mapping = {
        'free': 'FREE',
        'prime': 'PRIME', 
        'vip': 'VIP'
      };
      
      const chapter = await prisma.chapter.create({
        data: {
          chapterNumber: chapter_data.id,
          title: chapter_data.title,
          description: chapter_data.description,
          status: status_mapping[chapter_data.status?.toLowerCase()] || 'DRAFT',
          requiredRole: role_mapping[chapter_data.requiredRole?.toLowerCase()] || 'FREE',
          order: i + 1,
          courseId: course.id,
        }
      });
      
      console.log(`  创建章节: ${chapter.title}`);
      
      // 创建课时
      for (let j = 0; j < chapter_data.lessons.length; j++) {
        const lesson_data = chapter_data.lessons[j];
        
        await prisma.lesson.create({
          data: {
            title: lesson_data.title,
            duration: lesson_data.duration,
            url: lesson_data.url,
            previewUrl: lesson_data.previewUrl || null,
            isPreview: lesson_data.isPreview || false,
            requiredRole: role_mapping[lesson_data.requiredRole?.toLowerCase()] || 'FREE',
            videoUrl: lesson_data.videoUrl || null,
            order: j + 1,
            chapterId: chapter.id,
          }
        });
        
        console.log(`    创建课时: ${lesson_data.title}`);
      }
    }
    
    console.log('课程数据迁移完成!');
    
  } catch (error) {
    console.error('迁移过程中出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 如果直接运行此脚本
migrate_course_data();