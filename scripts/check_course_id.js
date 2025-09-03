#!/usr/bin/env node

/**
 * 检查课程ID是否存在
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check_course_id() {
  console.log('🔍 检查课程ID...\n')
  
  try {
    // 检查 cakecake 课程是否存在
    const cakecakeCourse = await prisma.course.findUnique({
      where: { courseId: 'cakecake' },
      include: {
        chapters: {
          include: {
            lessons: true
          }
        }
      }
    })
    
    if (cakecakeCourse) {
      console.log('✅ 找到课程 "cakecake":')
      console.log(`   标题: ${cakecakeCourse.title}`)
      console.log(`   状态: ${cakecakeCourse.status}`)
      console.log(`   章节数: ${cakecakeCourse.chapters.length}`)
    } else {
      console.log('❌ 课程 "cakecake" 不存在')
    }
    
    // 列出所有课程ID
    console.log('\n📚 所有现有课程:')
    const allCourses = await prisma.course.findMany({
      select: {
        courseId: true,
        title: true,
        status: true
      }
    })
    
    allCourses.forEach(course => {
      console.log(`   - ${course.courseId}: ${course.title} (${course.status})`)
    })
    
  } catch (error) {
    console.error('❌ 检查失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

check_course_id()