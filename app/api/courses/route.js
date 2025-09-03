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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const includeStructure = searchParams.get('includeStructure') === 'true';
    
    if (courseId) {
      // 获取特定课程
      const course = await prisma.course.findUnique({
        where: { courseId: courseId },
        include: {
          userCourses: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        }
      });
      
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }
      
      // 如果需要课程结构，从数据库获取
      let structure = null;
      
      if (includeStructure) {
        try {
          structure = await build_course_structure_from_db(course.courseId);
        } catch (dbError) {
          console.warn('Failed to load course structure from database:', dbError.message);
        }
      }
      
      return NextResponse.json({
        ...course,
        fileSystemStructure: structure,
        metadata: course.metadata
      });
    } else {
      // 获取所有课程
      const courses = await prisma.course.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      // 为每个课程获取结构（如果需要）
      if (includeStructure) {
        const coursesWithStructure = await Promise.all(
          courses.map(async (course) => {
            try {
              const structure = await build_course_structure_from_db(course.courseId);
              
              return {
                ...course,
                fileSystemStructure: structure
              };
            } catch (error) {
              console.warn(`Failed to load structure for course ${course.courseId}:`, error.message);
              return course;
            }
          })
        );
        
        return NextResponse.json(coursesWithStructure);
      }
      
      return NextResponse.json(courses);
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { courseId, title, description, thumbnail, price, status = 'DRAFT', category } = data;
    
    // 验证courseId格式和唯一性
    if (!courseId || !/^[a-z0-9-]+$/.test(courseId)) {
      return NextResponse.json(
        { error: 'Invalid courseId. Use only lowercase letters, numbers, and hyphens.' },
        { status: 400 }
      );
    }
    
    // 检查数据库中是否已存在
    const existingCourse = await prisma.course.findUnique({
      where: { courseId }
    });
    
    if (existingCourse) {
      return NextResponse.json(
        { error: 'Course ID already exists' },
        { status: 409 }
      );
    }
    
    // 创建数据库记录（不再依赖文件系统）
    const course = await prisma.course.create({
      data: {
        courseId,
        title,
        description,
        thumbnail,
        price: price ? parseFloat(price) : null,
        status,
        category,
        metadata: {
          createdVia: 'database',
          createdAt: new Date().toISOString()
        }
      }
    });
    
    // 创建默认第一章
    await prisma.chapter.create({
      data: {
        courseId: course.id,
        chapterNumber: 'chapter1',
        title: '第一章',
        description: '',
        order: 1,
        status: 'DRAFT',
        requiredRole: 'FREE'
      }
    });
    
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create course' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { courseId, ...updateData } = data;
    
    if (!courseId) {
      return NextResponse.json(
        { error: 'courseId is required' },
        { status: 400 }
      );
    }
    
    // 更新数据库记录
    const course = await prisma.course.update({
      where: { courseId },
      data: {
        ...updateData,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    
    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }
    
    // 删除数据库记录（会级联删除章节、课时、用户授权）
    await prisma.course.delete({
      where: { courseId }
    });
    
    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}