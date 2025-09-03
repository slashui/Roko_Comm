import { NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    console.log('开始迁移课程数据...');
    
    // 读取课程数据
    const courseFilePath = path.join(process.cwd(), 'public/course.json');
    const courseData = JSON.parse(fs.readFileSync(courseFilePath, 'utf8'));
    
    // 检查是否已存在数据
    const existingCourse = await prisma.course.findFirst();
    if (existingCourse) {
      const stats = {
        courses: await prisma.course.count(),
        chapters: await prisma.chapter.count(),
        lessons: await prisma.lesson.count()
      };
      return NextResponse.json({ 
        message: '数据库中已存在课程数据', 
        stats
      });
    }
    
    // 创建课程
    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description || null,
      }
    });
    
    console.log('✅ 创建课程:', course.title);
    
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
      
      console.log(`✅ 创建章节 ${i + 1}: ${chapter.title}`);
      createdChapters++;
      
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
        
        console.log(`✅ 创建课时 ${j + 1}: ${lessonData.title}`);
        createdLessons++;
      }
    }
    
    const stats = {
      courses: await prisma.course.count(),
      chapters: await prisma.chapter.count(),
      lessons: await prisma.lesson.count(),
      created: {
        courses: 1,
        chapters: createdChapters,
        lessons: createdLessons
      }
    };
    
    console.log('🎉 课程数据迁移完成!');
    
    return NextResponse.json({ 
      success: true,
      message: '课程数据迁移完成!',
      stats
    });
    
  } catch (error) {
    console.error('❌ 迁移错误:', error);
    return NextResponse.json(
      { 
        success: false,
        error: '迁移失败', 
        details: error.message,
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 返回当前数据库状态
    const stats = {
      courses: await prisma.course.count(),
      chapters: await prisma.chapter.count(),
      lessons: await prisma.lesson.count()
    };
    
    return NextResponse.json({
      message: '当前数据库状态',
      stats
    });
  } catch (error) {
    return NextResponse.json(
      { error: '获取状态失败', details: error.message },
      { status: 500 }
    );
  }
}