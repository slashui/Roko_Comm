import { NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const chapterId = searchParams.get('chapterId');
    
    if (chapterId) {
      // 获取特定章节
      const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          },
          course: true
        }
      });
      
      if (!chapter) {
        return NextResponse.json(
          { error: 'Chapter not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(chapter);
    } else if (courseId) {
      // 获取课程的所有章节
      const chapters = await prisma.chapter.findMany({
        where: { courseId },
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          }
        }
      });
      
      return NextResponse.json(chapters);
    } else {
      // 获取所有章节
      const chapters = await prisma.chapter.findMany({
        orderBy: [{ courseId: 'asc' }, { order: 'asc' }],
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          },
          course: true
        }
      });
      
      return NextResponse.json(chapters);
    }
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapters' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    const chapter = await prisma.chapter.create({
      data: {
        chapterNumber: data.chapterNumber,
        title: data.title,
        description: data.description,
        status: data.status || 'DRAFT',
        requiredRole: data.requiredRole || 'FREE',
        order: data.order,
        courseId: data.courseId,
      }
    });
    
    return NextResponse.json(chapter, { status: 201 });
  } catch (error) {
    console.error('Error creating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to create chapter' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, ...update_data } = data;
    
    const chapter = await prisma.chapter.update({
      where: { id },
      data: update_data
    });
    
    return NextResponse.json(chapter);
  } catch (error) {
    console.error('Error updating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to update chapter' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const chapterId = searchParams.get('chapterId');
    
    if (!chapterId) {
      return NextResponse.json(
        { error: 'Chapter ID is required' },
        { status: 400 }
      );
    }
    
    await prisma.chapter.delete({
      where: { id: chapterId }
    });
    
    return NextResponse.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    console.error('Error deleting chapter:', error);
    return NextResponse.json(
      { error: 'Failed to delete chapter' },
      { status: 500 }
    );
  }
}