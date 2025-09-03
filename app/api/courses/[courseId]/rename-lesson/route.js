import { NextResponse } from 'next/server';
import prisma from '../../../../../libs/prismadb.jsx';

export async function PUT(request, { params }) {
  try {
    const { courseId } = params;
    const { chapterNumber, oldLessonNumber, newLessonNumber } = await request.json();
    
    if (!chapterNumber || !oldLessonNumber || !newLessonNumber) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // 查找要重命名的课时
    const lesson = await prisma.lesson.findFirst({
      where: {
        lessonNumber: oldLessonNumber,
        chapter: {
          chapterNumber: chapterNumber,
          course: {
            courseId: courseId
          }
        }
      },
      include: {
        chapter: {
          include: {
            course: true
          }
        }
      }
    });
    
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }
    
    // 检查新课时号是否已存在
    const existingLesson = await prisma.lesson.findFirst({
      where: {
        lessonNumber: newLessonNumber,
        chapter: {
          chapterNumber: chapterNumber,
          course: {
            courseId: courseId
          }
        }
      }
    });
    
    if (existingLesson) {
      return NextResponse.json(
        { error: 'New lesson number already exists' },
        { status: 409 }
      );
    }
    
    // 更新课时号
    const updatedLesson = await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        lessonNumber: newLessonNumber,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Lesson renamed successfully',
      data: updatedLesson
    });
  } catch (error) {
    console.error('Error renaming lesson:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to rename lesson' },
      { status: 500 }
    );
  }
}