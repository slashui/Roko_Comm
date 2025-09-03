import { NextResponse } from 'next/server';
import prisma from '../../../../libs/prismadb';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const lesson = await prisma.lesson.findUnique({
      where: { id },
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
    
    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    const lesson = await prisma.lesson.update({
      where: { id },
      data: {
        title: data.title,
        duration: data.duration,
        url: data.url,
        previewUrl: data.previewUrl,
        isPreview: data.isPreview,
        requiredRole: data.requiredRole,
        videoUrl: data.videoUrl,
        order: data.order,
      }
    });
    
    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Error updating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to update lesson' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.lesson.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500 }
    );
  }
}