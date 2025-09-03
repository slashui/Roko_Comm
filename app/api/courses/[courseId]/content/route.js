import { NextResponse } from 'next/server';
import prisma from '../../../../../libs/prismadb.jsx';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

// MDX内容缓存
const mdxCache = new Map();
const MDX_CACHE_TTL = 10 * 60 * 1000; // 10分钟缓存

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

// 获取课程内容结构或特定课时内容
export async function GET(request, { params }) {
  try {
    const { courseId } = params;
    const { searchParams } = new URL(request.url);
    const chapterNumber = searchParams.get('chapter');
    const lessonNumber = searchParams.get('lesson');
    
    if (chapterNumber && lessonNumber) {
      // 检查MDX缓存
      const cacheKey = `${courseId}-${chapterNumber}-${lessonNumber}`;
      const cached = mdxCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < MDX_CACHE_TTL) {
        return NextResponse.json(cached.data);
      }
      
      // 从数据库获取课时内容
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
      
      if (!lesson || !lesson.content) {
        return NextResponse.json(
          { error: 'Lesson content not found' },
          { status: 404 }
        );
      }
      
      // 服务端预处理MDX
      try {
        const { data: frontmatter, content: mdxContent } = matter(lesson.content);
        const mdxSource = await serialize(mdxContent);
        
        const result = {
          content: lesson.content,
          frontmatter,
          mdxSource,
          processed: true,
          lessonMeta: {
            title: lesson.title,
            duration: lesson.duration,
            videoUrl: lesson.videoUrl,
            streamId: lesson.streamId,
            thumbnail: lesson.thumbnail,
            materials: lesson.materials
          }
        };
        
        // 缓存处理结果
        mdxCache.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });
        
        return NextResponse.json(result);
      } catch (mdxError) {
        console.error('MDX processing error:', mdxError);
        // 如果MDX处理失败，返回原始内容
        return NextResponse.json({ content: lesson.content, processed: false });
      }
    } else {
      // 获取课程结构
      const structure = await build_course_structure_from_db(courseId);
      if (!structure) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(structure);
    }
  } catch (error) {
    console.error('Error fetching course content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch course content' },
      { status: 500 }
    );
  }
}

// 创建章节或课时
export async function POST(request, { params }) {
  try {
    const { courseId } = params;
    const data = await request.json();
    const { type, chapterNumber, lessonNumber, lessonData = {} } = data;
    
    // 获取课程记录
    const course = await prisma.course.findUnique({
      where: { courseId }
    });
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    if (type === 'chapter') {
      // 创建新章节
      const existingChapter = await prisma.chapter.findUnique({
        where: {
          courseId_chapterNumber: {
            courseId: course.id,
            chapterNumber
          }
        }
      });
      
      if (existingChapter) {
        return NextResponse.json(
          { error: 'Chapter already exists' },
          { status: 409 }
        );
      }
      
      // 获取章节排序
      const chapterCount = await prisma.chapter.count({
        where: { courseId: course.id }
      });
      
      const newChapter = await prisma.chapter.create({
        data: {
          courseId: course.id,
          chapterNumber,
          title: lessonData.title || `章节 ${chapterNumber}`,
          description: lessonData.description || '',
          order: chapterCount + 1,
          status: lessonData.status || 'DRAFT',
          requiredRole: lessonData.requiredRole || 'FREE'
        }
      });
      
      return NextResponse.json({ 
        message: 'Chapter created successfully',
        chapter: newChapter
      }, { status: 201 });
      
    } else if (type === 'lesson') {
      // 创建新课时
      const chapter = await prisma.chapter.findUnique({
        where: {
          courseId_chapterNumber: {
            courseId: course.id,
            chapterNumber
          }
        }
      });
      
      if (!chapter) {
        return NextResponse.json(
          { error: 'Chapter not found' },
          { status: 404 }
        );
      }
      
      const existingLesson = await prisma.lesson.findUnique({
        where: {
          chapterId_lessonNumber: {
            chapterId: chapter.id,
            lessonNumber
          }
        }
      });
      
      if (existingLesson) {
        return NextResponse.json(
          { error: 'Lesson already exists' },
          { status: 409 }
        );
      }
      
      // 获取课时排序
      const lessonCount = await prisma.lesson.count({
        where: { chapterId: chapter.id }
      });
      
      const newLesson = await prisma.lesson.create({
        data: {
          chapterId: chapter.id,
          lessonNumber,
          title: lessonData.title || `课时 ${lessonNumber}`,
          duration: lessonData.duration || '30分钟',
          order: lessonCount + 1,
          content: lessonData.content || `# ${lessonData.title || `课时 ${lessonNumber}`}\n\n欢迎学习本节课程！\n\n在这里编写课程内容...`,
          videoUrl: lessonData.videoUrl || null,
          streamId: lessonData.streamId || null,
          thumbnail: lessonData.thumbnail || null,
          materials: lessonData.materials || null,
          isPreview: lessonData.isPreview || false,
          requiredRole: lessonData.requiredRole || 'FREE'
        }
      });
      
      // 清除MDX缓存
      const cacheKey = `${courseId}-${chapterNumber}-${lessonNumber}`;
      mdxCache.delete(cacheKey);
      
      return NextResponse.json({ 
        message: 'Lesson created successfully',
        lesson: newLesson
      }, { status: 201 });
      
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Use "chapter" or "lesson"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating course content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create course content' },
      { status: 500 }
    );
  }
}

// 更新课时内容
export async function PUT(request, { params }) {
  try {
    const { courseId } = params;
    const data = await request.json();
    const { chapterNumber, lessonNumber, content, ...updateFields } = data;
    
    if (!chapterNumber || !lessonNumber) {
      return NextResponse.json(
        { error: 'chapterNumber and lessonNumber are required' },
        { status: 400 }
      );
    }
    
    // 查找课时记录
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
    
    // 更新课时数据
    const updatedLesson = await prisma.lesson.update({
      where: { id: lesson.id },
      data: {
        ...(content !== undefined && { content }),
        ...(updateFields.title && { title: updateFields.title }),
        ...(updateFields.duration && { duration: updateFields.duration }),
        ...(updateFields.videoUrl !== undefined && { videoUrl: updateFields.videoUrl }),
        ...(updateFields.streamId !== undefined && { streamId: updateFields.streamId }),
        ...(updateFields.thumbnail !== undefined && { thumbnail: updateFields.thumbnail }),
        ...(updateFields.materials !== undefined && { materials: updateFields.materials }),
        ...(updateFields.isPreview !== undefined && { isPreview: updateFields.isPreview }),
        ...(updateFields.requiredRole && { requiredRole: updateFields.requiredRole }),
        updatedAt: new Date()
      }
    });
    
    // 清除MDX缓存
    const cacheKey = `${courseId}-${chapterNumber}-${lessonNumber}`;
    mdxCache.delete(cacheKey);
    
    return NextResponse.json({ 
      message: 'Lesson updated successfully',
      lesson: updatedLesson
    });
  } catch (error) {
    console.error('Error updating lesson content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update lesson content' },
      { status: 500 }
    );
  }
}