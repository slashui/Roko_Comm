#!/usr/bin/env node

/**
 * 课程数据迁移脚本
 * 将文件系统中的metadata.json和MDX文件迁移到数据库
 */

import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const COURSE_BASE_PATH = path.join(process.cwd(), 'app/[locale]/(dashboard)/(route)/course')

/**
 * 读取MDX文件内容
 */
function read_mdx_content(file_path) {
  if (!fs.existsSync(file_path)) {
    return null
  }
  return fs.readFileSync(file_path, 'utf8')
}

/**
 * 迁移单个课程
 */
async function migrate_course(course_id) {
  console.log(`开始迁移课程: ${course_id}`)
  
  const course_path = path.join(COURSE_BASE_PATH, course_id)
  const metadata_path = path.join(course_path, 'metadata.json')
  
  if (!fs.existsSync(metadata_path)) {
    console.log(`跳过课程 ${course_id}: metadata.json 不存在`)
    return
  }
  
  // 读取metadata.json
  const metadata = JSON.parse(fs.readFileSync(metadata_path, 'utf8'))
  
  // 查找或创建课程记录
  let course = await prisma.course.findUnique({
    where: { courseId: course_id }
  })
  
  if (!course) {
    console.log(`创建课程记录: ${course_id}`)
    course = await prisma.course.create({
      data: {
        courseId: course_id,
        title: metadata.title || course_id,
        description: metadata.description || '',
        category: metadata.category || null,
        price: metadata.price ? parseFloat(metadata.price) : null,
        status: metadata.status || 'DRAFT',
        thumbnail: metadata.thumbnail || null,
        metadata: {
          originalMetadata: metadata,
          migratedAt: new Date().toISOString()
        },
        createdAt: metadata.createdAt ? new Date(metadata.createdAt) : undefined,
        updatedAt: metadata.updatedAt ? new Date(metadata.updatedAt) : undefined
      }
    })
  } else {
    console.log(`更新课程记录: ${course_id}`)
    course = await prisma.course.update({
      where: { courseId: course_id },
      data: {
        title: metadata.title || course.title,
        description: metadata.description || course.description,
        category: metadata.category || course.category,
        price: metadata.price ? parseFloat(metadata.price) : course.price,
        status: metadata.status || course.status,
        thumbnail: metadata.thumbnail || course.thumbnail,
        metadata: {
          originalMetadata: metadata,
          migratedAt: new Date().toISOString()
        },
        updatedAt: metadata.updatedAt ? new Date(metadata.updatedAt) : new Date()
      }
    })
  }
  
  // 迁移章节数据
  if (metadata.structure && metadata.structure.chapters) {
    for (let i = 0; i < metadata.structure.chapters.length; i++) {
      const chapter_data = metadata.structure.chapters[i]
      
      // 跳过已删除的章节
      if (chapter_data.deleted) {
        console.log(`跳过已删除的章节: ${chapter_data.chapterNumber}`)
        continue
      }
      
      console.log(`迁移章节: ${chapter_data.chapterNumber}`)
      
      // 查找或创建章节记录
      let chapter = await prisma.chapter.findUnique({
        where: {
          courseId_chapterNumber: {
            courseId: course.id,
            chapterNumber: chapter_data.chapterNumber
          }
        }
      })
      
      if (!chapter) {
        chapter = await prisma.chapter.create({
          data: {
            courseId: course.id,
            chapterNumber: chapter_data.chapterNumber,
            title: chapter_data.showName || chapter_data.title || chapter_data.chapterNumber,
            description: chapter_data.description || '',
            order: chapter_data.order || (i + 1),
            status: chapter_data.status || 'DRAFT',
            requiredRole: chapter_data.requiredRole || 'FREE',
            createdAt: chapter_data.createdAt ? new Date(chapter_data.createdAt) : undefined,
            updatedAt: chapter_data.updatedAt ? new Date(chapter_data.updatedAt) : undefined
          }
        })
      } else {
        chapter = await prisma.chapter.update({
          where: { id: chapter.id },
          data: {
            title: chapter_data.showName || chapter_data.title || chapter.title,
            description: chapter_data.description || chapter.description,
            order: chapter_data.order || chapter.order,
            status: chapter_data.status || chapter.status,
            requiredRole: chapter_data.requiredRole || chapter.requiredRole,
            updatedAt: chapter_data.updatedAt ? new Date(chapter_data.updatedAt) : new Date()
          }
        })
      }
      
      // 迁移课时数据
      if (chapter_data.lessons) {
        for (let j = 0; j < chapter_data.lessons.length; j++) {
          const lesson_data = chapter_data.lessons[j]
          
          // 跳过已删除的课时
          if (lesson_data.deleted) {
            console.log(`跳过已删除的课时: ${lesson_data.lessonNumber}`)
            continue
          }
          
          console.log(`迁移课时: ${lesson_data.lessonNumber}`)
          
          // 读取MDX内容
          const mdx_path = path.join(course_path, chapter_data.chapterNumber, lesson_data.lessonNumber, 'index.mdx')
          const mdx_content = read_mdx_content(mdx_path)
          
          if (!mdx_content) {
            console.log(`警告: 课时 ${lesson_data.lessonNumber} 的MDX文件不存在`)
          }
          
          // 查找或创建课时记录
          let lesson = await prisma.lesson.findUnique({
            where: {
              chapterId_lessonNumber: {
                chapterId: chapter.id,
                lessonNumber: lesson_data.lessonNumber
              }
            }
          })
          
          if (!lesson) {
            lesson = await prisma.lesson.create({
              data: {
                chapterId: chapter.id,
                lessonNumber: lesson_data.lessonNumber,
                title: lesson_data.showName || lesson_data.title || lesson_data.lessonNumber,
                duration: lesson_data.duration || '30分钟',
                order: lesson_data.order || (j + 1),
                content: mdx_content,
                videoUrl: lesson_data.videoUrl || null,
                streamId: lesson_data.streamId || null,
                thumbnail: lesson_data.thumbnail || null,
                materials: lesson_data.materials ? lesson_data.materials : null,
                isPreview: lesson_data.isPreview || false,
                requiredRole: lesson_data.requiredRole || 'FREE',
                createdAt: lesson_data.createdAt ? new Date(lesson_data.createdAt) : undefined,
                updatedAt: lesson_data.updatedAt ? new Date(lesson_data.updatedAt) : undefined
              }
            })
          } else {
            lesson = await prisma.lesson.update({
              where: { id: lesson.id },
              data: {
                title: lesson_data.showName || lesson_data.title || lesson.title,
                duration: lesson_data.duration || lesson.duration,
                order: lesson_data.order || lesson.order,
                content: mdx_content || lesson.content,
                videoUrl: lesson_data.videoUrl || lesson.videoUrl,
                streamId: lesson_data.streamId || lesson.streamId,
                thumbnail: lesson_data.thumbnail || lesson.thumbnail,
                materials: lesson_data.materials ? lesson_data.materials : lesson.materials,
                isPreview: lesson_data.isPreview !== undefined ? lesson_data.isPreview : lesson.isPreview,
                requiredRole: lesson_data.requiredRole || lesson.requiredRole,
                updatedAt: lesson_data.updatedAt ? new Date(lesson_data.updatedAt) : new Date()
              }
            })
          }
          
          console.log(`✓ 课时 ${lesson_data.lessonNumber} 迁移完成`)
        }
      }
      
      console.log(`✓ 章节 ${chapter_data.chapterNumber} 迁移完成`)
    }
  }
  
  console.log(`✓ 课程 ${course_id} 迁移完成`)
}

/**
 * 主迁移函数
 */
async function main() {
  console.log('开始课程数据迁移...')
  
  if (!fs.existsSync(COURSE_BASE_PATH)) {
    console.log('课程目录不存在，跳过迁移')
    return
  }
  
  // 获取所有课程目录
  const course_dirs = fs.readdirSync(COURSE_BASE_PATH, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name)
  
  console.log(`发现 ${course_dirs.length} 个课程目录`)
  
  for (const course_id of course_dirs) {
    try {
      await migrate_course(course_id)
    } catch (error) {
      console.error(`迁移课程 ${course_id} 时出错:`, error)
    }
  }
  
  console.log('数据迁移完成!')
}

// 执行迁移
main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })