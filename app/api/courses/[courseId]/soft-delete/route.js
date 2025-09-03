import { NextResponse } from 'next/server';
import prisma from '../../../../../libs/prismadb.jsx';

// 删除课程、章节或课时（硬删除，因为数据在数据库中）
async function handleDelete(request, { params }) {
  try {
    const { courseId } = params;
    const data = await request.json();
    const { type, chapterNumber, lessonNumber } = data;
    
    console.log('Delete request:', { courseId, type, chapterNumber, lessonNumber });
    
    let result;
    
    if (type === 'course') {
      // 删除整个课程（级联删除章节和课时）
      result = await prisma.course.delete({
        where: {
          courseId: courseId
        }
      });
      console.log('Course deleted:', result);
    } else if (type === 'chapter') {
      // 删除章节（级联删除课时）
      if (!chapterNumber) {
        return NextResponse.json(
          { error: 'chapterNumber is required for chapter deletion' },
          { status: 400 }
        );
      }
      
      result = await prisma.chapter.delete({
        where: {
          courseId_chapterNumber: {
            courseId: (await prisma.course.findUnique({ where: { courseId } })).id,
            chapterNumber: chapterNumber
          }
        }
      });
      console.log('Chapter deleted:', result);
    } else if (type === 'lesson') {
      // 删除课时
      if (!chapterNumber || !lessonNumber) {
        return NextResponse.json(
          { error: 'chapterNumber and lessonNumber are required for lesson deletion' },
          { status: 400 }
        );
      }
      
      const lesson = await prisma.lesson.findFirst({
        where: {
          lessonNumber: lessonNumber,
          chapter: {
            chapterNumber: chapterNumber,
            course: {
              courseId: courseId
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
      
      result = await prisma.lesson.delete({
        where: { id: lesson.id }
      });
      console.log('Lesson deleted:', result);
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Use "course", "chapter", or "lesson"' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ 
      message: `${type} deleted successfully`,
      data: result
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error in delete:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete' },
      { status: 500 }
    );
  }
}

// 支持PUT方法（向后兼容）
export async function PUT(request, { params }) {
  return handleDelete(request, { params });
}

// 支持DELETE方法
export async function DELETE(request, { params }) {
  return handleDelete(request, { params });
}