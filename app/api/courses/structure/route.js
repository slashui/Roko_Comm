import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prismadb';

// 获取课程结构，格式类似原来的course.json
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    
    // 如果没有指定courseId，获取第一个课程
    let course;
    if (courseId) {
      course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          chapters: {
            orderBy: { order: 'asc' },
            include: {
              lessons: {
                orderBy: { order: 'asc' }
              }
            }
          }
        }
      });
    } else {
      // 获取第一个课程（兼容现有逻辑）
      course = await prisma.course.findFirst({
        include: {
          chapters: {
            orderBy: { order: 'asc' },
            include: {
              lessons: {
                orderBy: { order: 'asc' }
              }
            }
          }
        }
      });
    }
    
    if (!course) {
      return NextResponse.json(
        { error: 'No course found' },
        { status: 404 }
      );
    }
    
    // 转换为类似course.json的格式
    const course_structure = {
      title: course.title,
      chapters: course.chapters.map(chapter => ({
        id: chapter.chapterNumber,
        title: chapter.title,
        description: chapter.description,
        status: chapter.status.toLowerCase(),
        requiredRole: chapter.requiredRole.toLowerCase(),
        lessons: chapter.lessons.map(lesson => ({
          title: lesson.title,
          duration: lesson.duration,
          url: lesson.url,
          previewUrl: lesson.previewUrl,
          isPreview: lesson.isPreview,
          requiredRole: lesson.requiredRole.toLowerCase(),
          videoUrl: lesson.videoUrl
        }))
      }))
    };
    
    return NextResponse.json(course_structure);
  } catch (error) {
    console.error('Error fetching course structure:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course structure' },
      { status: 500 }
    );
  }
}