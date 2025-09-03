const fs = require('fs');
const path = require('path');

// 使用API接口来迁移数据
async function migrate_via_api() {
  try {
    console.log('开始通过API迁移课程数据...');
    
    // 读取课程数据
    const courseFilePath = path.join(__dirname, '../public/course.json');
    const courseData = JSON.parse(fs.readFileSync(courseFilePath, 'utf8'));
    
    console.log(`读取到课程: ${courseData.title}`);
    
    // 启动开发服务器并等待
    console.log('请确保开发服务器正在运行: npm run dev');
    console.log('然后在浏览器中打开: http://localhost:3000/api/migrate');
    
    // 创建API迁移接口的代码
    const apiCode = `
// 在 app/api/migrate/route.js 中添加这个代码:

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
      return NextResponse.json({ 
        message: '数据库中已存在课程数据', 
        courseCount: await prisma.course.count() 
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
      
      console.log('✅ 创建章节:', chapter.title);
      
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
        
        console.log('✅ 创建课时:', lessonData.title);
      }
    }
    
    const stats = {
      courses: await prisma.course.count(),
      chapters: await prisma.chapter.count(),
      lessons: await prisma.lesson.count()
    };
    
    return NextResponse.json({ 
      message: '课程数据迁移完成!',
      stats
    });
    
  } catch (error) {
    console.error('迁移错误:', error);
    return NextResponse.json(
      { error: '迁移失败', details: error.message },
      { status: 500 }
    );
  }
}
`;
    
    console.log('API迁移代码已生成，请创建文件：app/api/migrate/route.js');
    console.log(apiCode);
    
  } catch (error) {
    console.error('错误:', error);
  }
}

migrate_via_api();