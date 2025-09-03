#!/usr/bin/env node

/**
 * 测试更新后的API端点
 */

import { PrismaClient } from '@prisma/client'
import fetch from 'node-fetch'

const prisma = new PrismaClient()
const API_BASE = 'http://localhost:3001'

async function test_apis() {
  console.log('🧪 测试更新后的API端点...\n')
  
  try {
    // 获取一个测试课程
    const testCourse = await prisma.course.findFirst({
      include: {
        chapters: {
          include: {
            lessons: true
          }
        }
      }
    })
    
    if (!testCourse) {
      console.log('❌ 没有找到测试课程')
      return
    }
    
    const courseId = testCourse.courseId
    console.log(`📚 使用课程 ${courseId} 进行测试\n`)
    
    // 1. 测试获取课程结构
    console.log('1️⃣ 测试获取课程结构...')
    try {
      const response = await fetch(`${API_BASE}/api/courses?courseId=${courseId}&includeStructure=true`)
      if (response.ok) {
        const data = await response.json()
        console.log(`✅ 成功获取课程结构: ${data.title}, ${data.fileSystemStructure?.chapters?.length || 0} 章节`)
      } else {
        console.log(`❌ 获取课程结构失败: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ 获取课程结构出错: ${error.message}`)
    }
    
    // 2. 测试创建新章节
    console.log('\n2️⃣ 测试创建新章节...')
    const newChapterNumber = `test-chapter-${Date.now()}`
    try {
      const response = await fetch(`${API_BASE}/api/courses/${courseId}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'chapter',
          chapterNumber: newChapterNumber,
          lessonData: {
            title: '测试章节',
            description: '这是一个API测试章节'
          }
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log(`✅ 成功创建章节: ${data.chapter?.title}`)
      } else {
        const error = await response.json()
        console.log(`❌ 创建章节失败: ${error.error}`)
      }
    } catch (error) {
      console.log(`❌ 创建章节出错: ${error.message}`)
    }
    
    // 3. 测试更新章节
    if (testCourse.chapters.length > 0) {
      console.log('\n3️⃣ 测试更新章节...')
      const existingChapter = testCourse.chapters[0]
      try {
        const response = await fetch(`${API_BASE}/api/courses/${courseId}/update-chapter`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chapterNumber: existingChapter.chapterNumber,
            showName: `更新测试 - ${existingChapter.title}`,
            description: '通过API更新的描述'
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          console.log(`✅ 成功更新章节: ${data.data?.title}`)
        } else {
          const error = await response.json()
          console.log(`❌ 更新章节失败: ${error.error}`)
        }
      } catch (error) {
        console.log(`❌ 更新章节出错: ${error.message}`)
      }
    }
    
    // 4. 测试创建新课时
    if (testCourse.chapters.length > 0) {
      console.log('\n4️⃣ 测试创建新课时...')
      const chapter = testCourse.chapters[0]
      const newLessonNumber = `test-lesson-${Date.now()}`
      
      try {
        const response = await fetch(`${API_BASE}/api/courses/${courseId}/content`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'lesson',
            chapterNumber: chapter.chapterNumber,
            lessonNumber: newLessonNumber,
            lessonData: {
              title: '测试课时',
              duration: '20分钟',
              content: '# 测试课时\\n\\n这是通过API创建的课时内容。'
            }
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          console.log(`✅ 成功创建课时: ${data.lesson?.title}`)
          
          // 5. 测试获取课时内容
          console.log('\n5️⃣ 测试获取课时内容...')
          try {
            const contentResponse = await fetch(`${API_BASE}/api/courses/${courseId}/content?chapter=${chapter.chapterNumber}&lesson=${newLessonNumber}`)
            if (contentResponse.ok) {
              const contentData = await contentResponse.json()
              console.log(`✅ 成功获取课时内容: ${contentData.lessonMeta?.title}`)
              console.log(`   内容长度: ${contentData.content?.length || 0} 字符`)
              console.log(`   已处理MDX: ${contentData.processed ? '是' : '否'}`)
            } else {
              console.log(`❌ 获取课时内容失败: ${contentResponse.status}`)
            }
          } catch (error) {
            console.log(`❌ 获取课时内容出错: ${error.message}`)
          }
        } else {
          const error = await response.json()
          console.log(`❌ 创建课时失败: ${error.error}`)
        }
      } catch (error) {
        console.log(`❌ 创建课时出错: ${error.message}`)
      }
    }
    
    console.log('\n🎉 API测试完成！')
    
  } catch (error) {
    console.error('❌ 测试失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// 检查服务器是否运行
async function check_server() {
  try {
    const response = await fetch(`${API_BASE}/api/courses`)
    return response.ok
  } catch {
    return false
  }
}

async function main() {
  const serverRunning = await check_server()
  
  if (!serverRunning) {
    console.log('⚠️  开发服务器未运行在 localhost:3001')
    console.log('请先运行: npm run dev')
    return
  }
  
  await test_apis()
}

main()