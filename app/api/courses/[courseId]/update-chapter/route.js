import { NextResponse } from 'next/server';
import prisma from '../../../../../libs/prismadb.jsx';

export async function PUT(request, { params }) {
  try {
    const { courseId } = params;
    const { chapterNumber, showName, description, status, requiredRole } = await request.json();
    
    if (!chapterNumber) {
      return NextResponse.json(
        { error: 'Missing chapterNumber parameter' },
        { status: 400 }
      );
    }
    
    // 查找章节
    const chapter = await prisma.chapter.findFirst({
      where: {
        chapterNumber: chapterNumber,
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
    
    // 准备更新数据
    const updates = {};
    if (showName !== undefined) {
      updates.title = showName;
    }
    if (description !== undefined) {
      updates.description = description;
    }
    if (status !== undefined) {
      updates.status = status;
    }
    if (requiredRole !== undefined) {
      updates.requiredRole = requiredRole;
    }
    
    // 更新章节数据
    const updatedChapter = await prisma.chapter.update({
      where: { id: chapter.id },
      data: {
        ...updates,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Chapter updated successfully',
      data: updatedChapter
    });
  } catch (error) {
    console.error('Error updating chapter:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update chapter' },
      { status: 500 }
    );
  }
}