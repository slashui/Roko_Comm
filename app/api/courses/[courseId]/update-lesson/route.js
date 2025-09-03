import { NextResponse } from 'next/server';
import prisma from '../../../../../libs/prismadb.jsx';

export async function PUT(request, { params }) {
  try {
    const { courseId } = params;
    const { chapterNumber, lessonNumber, showName, duration, videoUrl, streamId, thumbnail, materials, isPreview, requiredRole } = await request.json();
    
    if (!chapterNumber || !lessonNumber) {
      return NextResponse.json(
        { error: 'Missing chapterNumber or lessonNumber parameter' },
        { status: 400 }
      );
    }
    
    // 查找课时
    const lesson = await prisma.lesson.findFirst({
      where: {
        lessonNumber: lessonNumber,
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
    
    // 准备更新数据
    const updates = {};
    if (showName !== undefined) {
      updates.title = showName;
    }
    if (duration !== undefined) {
      updates.duration = duration;
    }
    if (videoUrl !== undefined) {
      updates.videoUrl = videoUrl;
    }
    if (streamId !== undefined) {
      updates.streamId = streamId;
    }
    if (thumbnail !== undefined) {
      updates.thumbnail = thumbnail;
    }
    if (materials !== undefined) {
      updates.materials = materials;
    }
    if (isPreview !== undefined) {
      updates.isPreview = isPreview;
    }
    if (requiredRole !== undefined) {
      updates.requiredRole = requiredRole;
    }
    
    // 更新课时数据
    const updatedLesson = await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        ...updates,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Lesson updated successfully',
      data: updatedLesson
    });
  } catch (error) {
    console.error('Error updating lesson:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update lesson' },
      { status: 500 }
    );
  }
}