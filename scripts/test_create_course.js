#!/usr/bin/env node

/**
 * 测试创建新课程功能（基于数据库）
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test_create_course() {
  console.log('🧪 测试创建新课程...\n')
  
  try {
    const testCourseId = `test-course-${Date.now()}`
    
    // 1. 创建课程
    console.log(`📚 创建课程: ${testCourseId}`)
    const course = await prisma.course.create({
      data: {
        courseId: testCourseId,
        title: '测试课程',
        description: '这是一个通过数据库创建的测试课程',
        category: '测试',
        price: 99.99,
        status: 'DRAFT',
        metadata: {
          createdVia: 'database',
          createdAt: new Date().toISOString()
        }
      }
    })
    console.log('✅ 课程创建成功')
    
    // 2. 创建章节
    console.log('\n📖 创建章节...')
    const chapter1 = await prisma.chapter.create({
      data: {
        courseId: course.id,
        chapterNumber: 'chapter1',
        title: '第一章：入门',
        description: '这是第一章的介绍',
        order: 1,
        status: 'DRAFT',
        requiredRole: 'FREE'
      }
    })
    
    const chapter2 = await prisma.chapter.create({
      data: {
        courseId: course.id,
        chapterNumber: 'chapter2',
        title: '第二章：进阶',
        description: '这是第二章的介绍',
        order: 2,
        status: 'DRAFT',
        requiredRole: 'PRIME'
      }
    })
    console.log('✅ 章节创建成功')
    
    // 3. 创建课时
    console.log('\n📝 创建课时...')
    const lesson1 = await prisma.lesson.create({
      data: {
        chapterId: chapter1.id,
        lessonNumber: 'lesson1',
        title: '欢迎学习',
        duration: '15分钟',
        order: 1,
        content: `---
title: "欢迎学习"
duration: "15分钟"
---

# 欢迎学习

欢迎来到我们的课程！这是第一节课。

## 课程目标

- 了解基础概念
- 掌握基本操作
- 为后续学习做准备

## 开始学习

让我们开始这个激动人心的学习之旅吧！`,
        videoUrl: null,
        isPreview: true,
        requiredRole: 'FREE'
      }
    })
    
    const lesson2 = await prisma.lesson.create({
      data: {
        chapterId: chapter1.id,
        lessonNumber: 'lesson2',
        title: '基础概念',
        duration: '30分钟',
        order: 2,
        content: `---
title: "基础概念"
duration: "30分钟"
videoUrl: "https://example.com/video2.mp4"
---

# 基础概念

在这节课中，我们将学习一些重要的基础概念。

## 重要概念

1. **概念A**: 这是一个重要的概念
2. **概念B**: 另一个需要掌握的概念
3. **概念C**: 第三个关键概念

## 实践练习

请尝试以下练习来巩固学习...`,
        videoUrl: 'https://example.com/video2.mp4',
        isPreview: false,
        requiredRole: 'FREE'
      }
    })
    
    const lesson3 = await prisma.lesson.create({
      data: {
        chapterId: chapter2.id,
        lessonNumber: 'lesson1',
        title: '进阶技巧',
        duration: '45分钟',
        order: 1,
        content: `---
title: "进阶技巧"
duration: "45分钟"
videoUrl: "https://example.com/video3.mp4"
---

# 进阶技巧

现在让我们学习一些进阶的技巧和方法。

## 高级功能

- 功能1：详细说明
- 功能2：使用方法
- 功能3：最佳实践

## 案例研究

通过实际案例来理解这些概念...`,
        videoUrl: 'https://example.com/video3.mp4',
        materials: [
          { name: '课程资料1.pdf', url: 'https://example.com/material1.pdf' },
          { name: '代码示例.zip', url: 'https://example.com/code.zip' }
        ],
        isPreview: false,
        requiredRole: 'PRIME'
      }
    })
    
    console.log('✅ 课时创建成功')
    
    // 4. 查询完整的课程结构
    console.log('\n🔍 查询完整课程结构...')
    const fullCourse = await prisma.course.findUnique({
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
    
    console.log(`\n📊 课程结构概览:`)
    console.log(`   课程: ${fullCourse.title}`)
    console.log(`   ID: ${fullCourse.courseId}`)
    console.log(`   状态: ${fullCourse.status}`)
    console.log(`   价格: ¥${fullCourse.price}`)
    console.log(`   章节数: ${fullCourse.chapters.length}`)
    
    let totalLessons = 0
    for (const chapter of fullCourse.chapters) {
      totalLessons += chapter.lessons.length
      console.log(`   - ${chapter.title}: ${chapter.lessons.length} 课时`)
      for (const lesson of chapter.lessons) {
        const preview = lesson.isPreview ? '(可预览)' : ''
        const materials = lesson.materials ? `[${lesson.materials.length}个资料]` : ''
        console.log(`     - ${lesson.title} ${lesson.duration} ${preview} ${materials}`)
      }
    }
    console.log(`   总课时: ${totalLessons}`)
    
    // 5. 测试MDX内容
    console.log('\n📄 测试课时内容...')
    const testLesson = fullCourse.chapters[0].lessons[0]
    console.log(`课时标题: ${testLesson.title}`)
    console.log(`内容长度: ${testLesson.content.length} 字符`)
    console.log(`内容预览: ${testLesson.content.substring(0, 100)}...`)
    
    console.log('\n🎉 测试完成！新课程创建成功！')
    console.log(`\n💡 你可以通过以下API访问这个课程:`)
    console.log(`   GET /api/courses?courseId=${testCourseId}&includeStructure=true`)
    console.log(`   GET /api/courses/${testCourseId}/content?chapter=chapter1&lesson=lesson1`)
    
  } catch (error) {
    console.error('❌ 测试失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test_create_course()