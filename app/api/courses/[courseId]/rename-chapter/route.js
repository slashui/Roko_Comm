import { NextResponse } from 'next/server';
import prisma from '../../../../../libs/prismadb.jsx';

export async function PUT(request, { params }) {
  try {
    const { courseId } = params;
    const { oldChapterNumber, newChapterNumber } = await request.json();
    
    if (!oldChapterNumber || !newChapterNumber) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // 查找要重命名的章节
    const chapter = await prisma.chapter.findFirst({
      where: {
        chapterNumber: oldChapterNumber,
        course: {
          courseId: courseId
        }
      },
      include: {
        course: true
      }
    });
    
    if (!chapter) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }
    
    // 检查新章节号是否已存在
    const existingChapter = await prisma.chapter.findFirst({
      where: {
        chapterNumber: newChapterNumber,
        course: {
          courseId: courseId
        }
      }
    });
    
    if (existingChapter) {
      return NextResponse.json(
        { error: 'New chapter number already exists' },
        { status: 409 }
      );
    }
    
    // 更新章节号
    const updatedChapter = await prisma.chapter.update({
      where: { id: chapter.id },
      data: {
        chapterNumber: newChapterNumber,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Chapter renamed successfully',
      data: updatedChapter
    });
  } catch (error) {
    console.error('Error renaming chapter:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to rename chapter' },
      { status: 500 }
    );
  }
}