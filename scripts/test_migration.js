#!/usr/bin/env node

/**
 * 测试数据库迁移是否成功
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test_migration() {
  console.log('🧪 测试数据库迁移结果...\n')
  
  try {
    // 1. 检查课程数据
    const courses = await prisma.course.findMany({
      include: {
        chapters: {
          include: {
            lessons: true
          }
        }
      }
    })
    
    console.log(`📚 找到 ${courses.length} 个课程:`)
    
    for (const course of courses) {
      console.log(`\n  课程: ${course.title} (${course.courseId})`)
      console.log(`    状态: ${course.status}`)
      console.log(`    章节数: ${course.chapters.length}`)
      
      let totalLessons = 0
      for (const chapter of course.chapters) {
        totalLessons += chapter.lessons.length
        console.log(`    - ${chapter.title} (${chapter.chapterNumber}): ${chapter.lessons.length} 课时`)
        
        for (const lesson of chapter.lessons) {
          const hasContent = lesson.content ? '✅' : '❌'
          console.log(`      - ${lesson.title} (${lesson.lessonNumber}) ${hasContent}`)
        }
      }
      
      console.log(`    总课时数: ${totalLessons}`)
    }
    
    // 2. 测试API函数
    console.log('\n🔧 测试API函数...')
    
    if (courses.length > 0) {
      const testCourseId = courses[0].courseId
      console.log(`使用课程 ${testCourseId} 进行测试`)
      
      // 测试构建课程结构的函数
      console.log('\n正在测试课程结构构建...')
      
      const courseWithStructure = await prisma.course.findUnique({
        where: { courseId: testCourseId },
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
      })
      
      if (courseWithStructure) {
        const structure = {
          courseId: courseWithStructure.courseId,
          chapters: courseWithStructure.chapters.map(chapter => ({
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
              url: `/course/${testCourseId}/${chapter.chapterNumber}/${lesson.lessonNumber}`
            }))
          }))
        }
        
        console.log('✅ 课程结构构建成功')
        console.log(`   章节数: ${structure.chapters.length}`)
        console.log(`   课时数: ${structure.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)}`)
      }
    }
    
    console.log('\n🎉 数据库迁移测试完成！')
    
  } catch (error) {
    console.error('❌ 测试失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test_migration()