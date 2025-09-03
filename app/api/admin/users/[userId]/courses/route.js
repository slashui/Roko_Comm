import { NextResponse } from 'next/server';
import prisma from '../../../../../../libs/prismadb.jsx';

// 为用户添加课程
export async function POST(request, { params }) {
  try {
    const { userId } = params;
    const { courseId } = await request.json();
    
    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }
    
    // 检查用户是否存在
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // 检查课程是否存在
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // 检查是否已经拥有该课程
    const existingUserCourse = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId
        }
      }
    });
    
    if (existingUserCourse) {
      return NextResponse.json(
        { error: 'User already has access to this course' },
        { status: 409 }
      );
    }
    
    // 添加课程授权
    const userCourse = await prisma.userCourse.create({
      data: {
        userId: userId,
        courseId: courseId
      },
      include: {
        course: {
          select: {
            id: true,
            courseId: true,
            title: true,
            description: true,
            price: true,
            status: true
          }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Course added successfully',
      userCourse
    });
  } catch (error) {
    console.error('Error adding course to user:', error);
    return NextResponse.json(
      { error: 'Failed to add course to user' },
      { status: 500 }
    );
  }
}

// 移除用户的课程
export async function DELETE(request, { params }) {
  try {
    const { userId } = params;
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    
    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }
    
    // 删除用户课程授权
    const deletedUserCourse = await prisma.userCourse.delete({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Course removed successfully',
      deletedUserCourse
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'User course assignment not found' },
        { status: 404 }
      );
    }
    
    console.error('Error removing course from user:', error);
    return NextResponse.json(
      { error: 'Failed to remove course from user' },
      { status: 500 }
    );
  }
}