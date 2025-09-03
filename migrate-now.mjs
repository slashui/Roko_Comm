// 使用prismadb.jsx中的客户端
import prismaClient from './libs/prismadb.jsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  try {
    console.log('🚀 开始迁移课程数据...');
    
    // 读取课程数据
    const courseFilePath = path.join(__dirname, 'public/course.json');
    const courseData = JSON.parse(fs.readFileSync(courseFilePath, 'utf8'));
    
    console.log(`📚 读取到课程: ${courseData.title}`);
    
    // 检查是否已存在数据
    const existingCourse = await prismaClient.course.findFirst();
    if (existingCourse) {
      console.log('⚠️ 数据库中已存在课程数据');
      const stats = {
        courses: await prismaClient.course.count(),
        chapters: await prismaClient.chapter.count(),
        lessons: await prismaClient.lesson.count()
      };
      console.log('📊 当前统计:', stats);
      return;
    }
    
    // 创建课程
    const course = await prismaClient.course.create({
      data: {
        title: courseData.title,
        description: courseData.description || null,
      }
    });
    
    console.log(`✅ 创建课程: ${course.title}`);
    
    // 角色映射
    const roleMapping = {
      'free': 'FREE',
      'prime': 'PRIME', 
      'vip': 'VIP'
    };
    
    // 状态映射
    const statusMapping = {
      'completed': 'COMPLETED',
      'draft': 'DRAFT',
      'published': 'PUBLISHED'
    };
    
    let createdChapters = 0;
    let createdLessons = 0;
    
    // 创建章节和课时
    for (let i = 0; i < courseData.chapters.length; i++) {
      const chapterData = courseData.chapters[i];
      
      const chapter = await prismaClient.chapter.create({
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
      
      console.log(`  ✅ 章节 ${i + 1}: ${chapter.title}`);
      createdChapters++;
      
      // 创建课时
      for (let j = 0; j < chapterData.lessons.length; j++) {
        const lessonData = chapterData.lessons[j];
        
        await prismaClient.lesson.create({
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
        
        console.log(`    ✅ 课时 ${j + 1}: ${lessonData.title}`);
        createdLessons++;
      }
    }
    
    // 最终统计
    const finalStats = {
      courses: await prismaClient.course.count(),
      chapters: await prismaClient.chapter.count(),
      lessons: await prismaClient.lesson.count()
    };
    
    console.log('');
    console.log('🎉 课程数据迁移完成!');
    console.log('📊 最终统计:');
    console.log(`   课程: ${finalStats.courses}`);
    console.log(`   章节: ${finalStats.chapters}`);
    console.log(`   课时: ${finalStats.lessons}`);
    console.log('');
    console.log('✨ 新创建:');
    console.log(`   章节: ${createdChapters}`);
    console.log(`   课时: ${createdLessons}`);
    
  } catch (error) {
    console.error('❌ 迁移失败:', error.message);
    console.error('详细错误:', error);
  } finally {
    await prismaClient.$disconnect();
  }
}

// 运行迁移
migrate();