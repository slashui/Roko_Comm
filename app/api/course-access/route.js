import { NextResponse } from 'next/server';
import prisma from '../../../libs/prismadb.jsx';

/**
 * 从数据库构建课程结构
 */
async function build_course_structure_from_db(course_id) {
  const course = await prisma.course.findUnique({
    where: { courseId: course_id },
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

  if (!course) {
    return null;
  }

  return {
    courseId: course.courseId,
    chapters: course.chapters.map(chapter => ({
      chapterNumber: chapter.chapterNumber,
      title: chapter.title,
      description: chapter.description,
      lessons: chapter.lessons.map(lesson => ({
        lessonNumber: lesson.lessonNumber,
        title: lesson.title,
        duration: lesson.duration,
        videoUrl: lesson.videoUrl,
        streamId: lesson.streamId,
        thumbnail: lesson.thumbnail,
        materials: lesson.materials || [],
        isPreview: lesson.isPreview,
        requiredRole: lesson.requiredRole,
        url: `/course/${course_id}/${chapter.chapterNumber}/${lesson.lessonNumber}`
      }))
    }))
  };
}

// 检查用户对课程的访问权限
export async function POST(request) {
  try {
    const { userId, courseId } = await request.json();
    
    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'userId and courseId are required' },
        { status: 400 }
      );
    }
    
    // 获取课程信息
    const course = await prisma.course.findUnique({
      where: { courseId: courseId }
    });
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // 检查用户是否有课程授权
    const userCourse = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id // 注意这里用的是数据库ID，不是courseId
        }
      }
    });
    
    const hasAccess = !!userCourse;
    
    // 如果有访问权限，获取数据库结构
    let courseStructure = null;
    
    if (hasAccess) {
      try {
        courseStructure = await build_course_structure_from_db(courseId);
      } catch (dbError) {
        console.warn('Failed to load course structure from database:', dbError.message);
      }
    }
    
    return NextResponse.json({
      hasAccess,
      course: hasAccess ? course : null,
      courseStructure,
      courseMetadata: course.metadata,
      userCourse: userCourse || null,
      grantedAt: userCourse?.grantedAt || null
    });
    
  } catch (error) {
    console.error('Error checking course access:', error);
    return NextResponse.json(
      { error: 'Failed to check course access' },
      { status: 500 }
    );
  }
}