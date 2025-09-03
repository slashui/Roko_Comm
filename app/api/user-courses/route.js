import { NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb.jsx';

// 获取用户的课程访问权限
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    
    console.log('GET /api/user-courses - userId:', userId, 'courseId:', courseId);
    
    if (userId && courseId) {
      // 检查用户是否有特定课程的访问权限
      console.log('Checking access for specific course');
      const userCourse = await prisma.userCourse.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        },
        include: {
          course: true
        }
      });
      
      console.log('Found userCourse:', userCourse);
      return NextResponse.json({ hasAccess: !!userCourse, userCourse });
    } else if (userId) {
      // 获取用户的所有课程
      console.log('Fetching all courses for user:', userId);
      const userCourses = await prisma.userCourse.findMany({
        where: { userId },
        include: {
          course: true
        }
      });
      
      console.log('Found userCourses:', userCourses.length, 'courses');
      console.log('UserCourses data:', JSON.stringify(userCourses, null, 2));
      return NextResponse.json(userCourses);
    } else {
      console.log('Missing userId parameter');
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in GET /api/user-courses:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// 授权用户访问课程
export async function POST(request) {
  try {
    const data = await request.json();
    const { userId, courseId } = data;
    
    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'User ID and Course ID are required' },
        { status: 400 }
      );
    }
    
    // 检查是否已经存在
    const existing = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });
    
    if (existing) {
      return NextResponse.json(
        { message: 'User already has access to this course' },
        { status: 200 }
      );
    }
    
    const userCourse = await prisma.userCourse.create({
      data: {
        userId,
        courseId
      },
      include: {
        course: true,
        user: true
      }
    });
    
    return NextResponse.json(userCourse, { status: 201 });
  } catch (error) {
    console.error('Error creating user course access:', error);
    return NextResponse.json(
      { error: 'Failed to grant course access' },
      { status: 500 }
    );
  }
}

// 撤销用户课程访问权限
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    
    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'User ID and Course ID are required' },
        { status: 400 }
      );
    }
    
    await prisma.userCourse.delete({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });
    
    return NextResponse.json({ message: 'Course access revoked successfully' });
  } catch (error) {
    console.error('Error revoking course access:', error);
    return NextResponse.json(
      { error: 'Failed to revoke course access' },
      { status: 500 }
    );
  }
}