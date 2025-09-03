#!/usr/bin/env node

/**
 * 测试课程删除功能
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test_delete_functionality() {
  console.log('🧪 测试课程删除功能...\n')
  
  try {
    // 1. 创建一个测试课程用于删除
    console.log('📚 创建测试课程...')
    const testCourseId = `delete-test-${Date.now()}`
    
    const course = await prisma.course.create({
      data: {
        courseId: testCourseId,
        title: '删除测试课程',
        description: '这是一个用于测试删除功能的课程',
        status: 'DRAFT'
      }
    })
    console.log(`✅ 创建成功: ${course.title}`)
    
    // 2. 创建一个章节和课时
    const chapter = await prisma.chapter.create({
      data: {
        courseId: course.id,
        chapterNumber: 'chapter1',
        title: '测试章节',
        order: 1
      }
    })
    
    const lesson = await prisma.lesson.create({
      data: {
        chapterId: chapter.id,
        lessonNumber: 'lesson1',
        title: '测试课时',
        order: 1,
        content: '测试内容'
      }
    })
    
    console.log(`📖 创建章节: ${chapter.title}`)
    console.log(`📝 创建课时: ${lesson.title}`)
    
    // 3. 验证数据存在
    const courseWithRelations = await prisma.course.findUnique({
      where: { id: course.id },
      include: {
        chapters: {
          include: {
            lessons: true
          }
        },
        userCourses: true
      }
    })
    
    console.log(`\n📊 删除前统计:`)
    console.log(`   课程: ${courseWithRelations.title}`)
    console.log(`   章节数: ${courseWithRelations.chapters.length}`)
    console.log(`   课时数: ${courseWithRelations.chapters.reduce((total, ch) => total + ch.lessons.length, 0)}`)
    console.log(`   用户授权数: ${courseWithRelations.userCourses.length}`)
    
    // 4. 测试删除功能
    console.log(`\n🗑️  开始删除课程 ${testCourseId}...`)
    
    try {
      await prisma.course.delete({
        where: { courseId: testCourseId }
      })
      console.log('✅ 课程删除成功')
      
      // 5. 验证删除效果
      console.log('\n🔍 验证删除效果...')
      
      const deletedCourse = await prisma.course.findUnique({
        where: { courseId: testCourseId }
      })
      
      const remainingChapters = await prisma.chapter.findMany({
        where: { courseId: course.id }
      })
      
      const remainingLessons = await prisma.lesson.findMany({
        where: { chapterId: chapter.id }
      })
      
      console.log(`   课程存在: ${deletedCourse ? '是' : '否'}`)
      console.log(`   剩余章节: ${remainingChapters.length}`)
      console.log(`   剩余课时: ${remainingLessons.length}`)
      
      if (!deletedCourse && remainingChapters.length === 0 && remainingLessons.length === 0) {
        console.log('✅ 级联删除成功！')
      } else {
        console.log('❌ 删除不完整')
      }
      
    } catch (deleteError) {
      console.error('❌ 删除失败:', deleteError)
      
      // 如果删除失败，清理测试数据
      console.log('🧹 清理测试数据...')
      try {
        await prisma.lesson.delete({ where: { id: lesson.id } })
        await prisma.chapter.delete({ where: { id: chapter.id } })
        await prisma.course.delete({ where: { id: course.id } })
        console.log('✅ 清理完成')
      } catch (cleanupError) {
        console.error('❌ 清理失败:', cleanupError)
      }
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test_delete_functionality()