import fs from 'fs'
import path from 'path'

// 课程文件系统基础路径
const COURSE_BASE_PATH = path.join(process.cwd(), 'app/[locale]/(dashboard)/(route)/course')

/**
 * 创建课程文件夹结构
 */
export async function createCourseDirectory(courseId, courseData) {
  const coursePath = path.join(COURSE_BASE_PATH, courseId)
  
  // 创建课程目录
  if (!fs.existsSync(coursePath)) {
    fs.mkdirSync(coursePath, { recursive: true })
  }
  
  // 创建 metadata.json with default chapter1
  const metadata = {
    title: courseData.title,
    description: courseData.description,
    thumbnail: courseData.thumbnail,
    price: courseData.price,
    category: courseData.category,
    status: courseData.status,
    createdAt: new Date().toISOString(),
    chapters: [],
    structure: {
      chapters: [
        {
          chapterNumber: "chapter1",
          showName: "第一章",
          description: "",
          status: "DRAFT",
          requiredRole: "FREE",
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lessons: []
        }
      ]
    }
  }
  
  const metadataPath = path.join(coursePath, 'metadata.json')
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))
  
  // 创建默认的 chapter1 目录
  const chapter1Path = path.join(coursePath, 'chapter1')
  if (!fs.existsSync(chapter1Path)) {
    fs.mkdirSync(chapter1Path, { recursive: true })
  }
  
  return coursePath
}

/**
 * 删除课程文件夹
 */
export async function deleteCourseDirectory(courseId) {
  const coursePath = path.join(COURSE_BASE_PATH, courseId)
  
  if (fs.existsSync(coursePath)) {
    fs.rmSync(coursePath, { recursive: true, force: true })
  }
}

/**
 * 创建章节目录
 */
export async function createChapterDirectory(courseId, chapterNumber) {
  const chapterPath = path.join(COURSE_BASE_PATH, courseId, chapterNumber)
  
  if (!fs.existsSync(chapterPath)) {
    fs.mkdirSync(chapterPath, { recursive: true })
  }
  
  // 同步更新课程metadata.json的structure字段
  try {
    const courseMetadata = await getCourseMetadata(courseId)
    
    // 确保structure和chapters存在
    if (!courseMetadata.structure) {
      courseMetadata.structure = { chapters: [] }
    }
    if (!courseMetadata.structure.chapters) {
      courseMetadata.structure.chapters = []
    }
    
    // 检查章节是否已存在
    const existingChapter = courseMetadata.structure.chapters.find(
      chapter => chapter.chapterNumber === chapterNumber
    )
    
    if (!existingChapter) {
      // 添加新章节到structure
      const newChapter = {
        chapterNumber,
        showName: chapterNumber,
        description: '',
        status: 'DRAFT',
        requiredRole: 'FREE',
        order: courseMetadata.structure.chapters.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lessons: []
      }
      
      courseMetadata.structure.chapters.push(newChapter)
      
      // 更新课程metadata
      await updateCourseMetadata(courseId, courseMetadata)
    }
  } catch (error) {
    console.error('Failed to update course metadata after creating chapter:', error)
    // 不抛出错误，因为章节目录已经创建成功
  }
  
  return chapterPath
}

/**
 * 创建课时目录和MDX文件
 */
export async function createLessonFile(courseId, chapterNumber, lessonNumber, lessonData = {}) {
  const lessonPath = path.join(COURSE_BASE_PATH, courseId, chapterNumber, lessonNumber)
  
  // 创建课时目录
  if (!fs.existsSync(lessonPath)) {
    fs.mkdirSync(lessonPath, { recursive: true })
  }
  
  // 创建 index.mdx 文件
  const mdxContent = `---
title: "${lessonData.title || '新课时'}"
duration: "${lessonData.duration || '30分钟'}"
videoUrl: "${lessonData.videoUrl || ''}"
---

# ${lessonData.title || '新课时'}

${lessonData.content || '欢迎学习本节课程！\\n\\n在这里编写课程内容...'}
`
  
  const mdxPath = path.join(lessonPath, 'index.mdx')
  fs.writeFileSync(mdxPath, mdxContent)
  
  // 同步更新课程metadata.json的structure字段
  try {
    const courseMetadata = await getCourseMetadata(courseId)
    
    // 确保structure和chapters存在
    if (!courseMetadata.structure) {
      courseMetadata.structure = { chapters: [] }
    }
    if (!courseMetadata.structure.chapters) {
      courseMetadata.structure.chapters = []
    }
    
    // 查找对应的章节
    let targetChapter = courseMetadata.structure.chapters.find(
      chapter => chapter.chapterNumber === chapterNumber
    )
    
    // 如果章节不存在，先创建章节
    if (!targetChapter) {
      targetChapter = {
        chapterNumber,
        showName: chapterNumber,
        description: '',
        status: 'DRAFT',
        requiredRole: 'FREE',
        order: courseMetadata.structure.chapters.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lessons: []
      }
      courseMetadata.structure.chapters.push(targetChapter)
    }
    
    // 确保lessons数组存在
    if (!targetChapter.lessons) {
      targetChapter.lessons = []
    }
    
    // 检查课时是否已存在
    const existingLesson = targetChapter.lessons.find(
      lesson => lesson.lessonNumber === lessonNumber
    )
    
    if (!existingLesson) {
      // 添加新课时到章节
      const newLesson = {
        lessonNumber,
        showName: lessonData.title || lessonNumber,
        duration: lessonData.duration || '30分钟',
        url: `/cn/course/${chapterNumber}/${lessonNumber}`,
        requiredRole: 'FREE',
        order: targetChapter.lessons.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      targetChapter.lessons.push(newLesson)
      
      // 更新课程metadata
      await updateCourseMetadata(courseId, courseMetadata)
    }
  } catch (error) {
    console.error('Failed to update course metadata after creating lesson:', error)
    // 不抛出错误，因为课时文件已经创建成功
  }
  
  return mdxPath
}

/**
 * 读取课程metadata
 */
export async function getCourseMetadata(courseId) {
  const metadataPath = path.join(COURSE_BASE_PATH, courseId, 'metadata.json')
  
  if (!fs.existsSync(metadataPath)) {
    throw new Error(`Course metadata not found: ${courseId}`)
  }
  
  const content = fs.readFileSync(metadataPath, 'utf8')
  return JSON.parse(content)
}

/**
 * 更新课程metadata
 */
export async function updateCourseMetadata(courseId, updates) {
  const metadataPath = path.join(COURSE_BASE_PATH, courseId, 'metadata.json')
  
  let metadata = {}
  if (fs.existsSync(metadataPath)) {
    const content = fs.readFileSync(metadataPath, 'utf8')
    metadata = JSON.parse(content)
  }
  
  // 合并更新
  const updatedMetadata = {
    ...metadata,
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  fs.writeFileSync(metadataPath, JSON.stringify(updatedMetadata, null, 2))
  
  // 清除缓存
  clearCourseStructureCache(courseId)
  
  return updatedMetadata
}

/**
 * 读取章节metadata
 */
export async function getChapterMetadata(courseId, chapterNumber) {
  const courseMetadata = await getCourseMetadata(courseId)
  if (courseMetadata.structure && courseMetadata.structure.chapters) {
    const chapterData = courseMetadata.structure.chapters.find(
      chapter => chapter.chapterNumber === chapterNumber
    )
    if (chapterData) {
      return chapterData
    }
  }
  
  // 如果章节不存在，抛出错误
  throw new Error(`Chapter ${chapterNumber} not found in course ${courseId}`)
}

/**
 * 更新章节metadata
 */
export async function updateChapterMetadata(courseId, chapterNumber, updates) {
  const courseMetadata = await getCourseMetadata(courseId)
  
  if (!courseMetadata.structure || !courseMetadata.structure.chapters) {
    throw new Error(`Course structure not found for course ${courseId}`)
  }
  
  const chapterIndex = courseMetadata.structure.chapters.findIndex(
    chapter => chapter.chapterNumber === chapterNumber
  )
  
  if (chapterIndex === -1) {
    throw new Error(`Chapter ${chapterNumber} not found in course ${courseId}`)
  }
  
  // 更新章节数据
  const updatedChapter = {
    ...courseMetadata.structure.chapters[chapterIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  courseMetadata.structure.chapters[chapterIndex] = updatedChapter
  
  // 保存课程metadata
  await updateCourseMetadata(courseId, courseMetadata)
  
  return updatedChapter
}

/**
 * 读取课时metadata
 */
export async function getLessonMetadata(courseId, chapterNumber, lessonNumber) {
  const courseMetadata = await getCourseMetadata(courseId)
  if (courseMetadata.structure && courseMetadata.structure.chapters) {
    const chapterData = courseMetadata.structure.chapters.find(
      chapter => chapter.chapterNumber === chapterNumber
    )
    if (chapterData && chapterData.lessons) {
      const lessonData = chapterData.lessons.find(
        lesson => lesson.lessonNumber === lessonNumber
      )
      if (lessonData) {
        return lessonData
      }
    }
  }
  
  // 如果课时不存在，抛出错误
  throw new Error(`Lesson ${lessonNumber} not found in chapter ${chapterNumber} of course ${courseId}`)
}

/**
 * 更新课时metadata
 */
export async function updateLessonMetadata(courseId, chapterNumber, lessonNumber, updates) {
  const courseMetadata = await getCourseMetadata(courseId)
  
  if (!courseMetadata.structure || !courseMetadata.structure.chapters) {
    throw new Error(`Course structure not found for course ${courseId}`)
  }
  
  const chapterIndex = courseMetadata.structure.chapters.findIndex(
    chapter => chapter.chapterNumber === chapterNumber
  )
  
  if (chapterIndex === -1) {
    throw new Error(`Chapter ${chapterNumber} not found in course ${courseId}`)
  }
  
  const chapter = courseMetadata.structure.chapters[chapterIndex]
  if (!chapter.lessons) {
    chapter.lessons = []
  }
  
  const lessonIndex = chapter.lessons.findIndex(
    lesson => lesson.lessonNumber === lessonNumber
  )
  
  let updatedLesson
  
  if (lessonIndex !== -1) {
    // 更新现有课时
    updatedLesson = {
      ...chapter.lessons[lessonIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    chapter.lessons[lessonIndex] = updatedLesson
  } else {
    // 添加新课时
    updatedLesson = {
      lessonNumber,
      showName: lessonNumber,
      duration: '30分钟',
      url: `/cn/course/${chapterNumber}/${lessonNumber}`,
      requiredRole: 'FREE',
      order: chapter.lessons.length + 1,
      createdAt: new Date().toISOString(),
      ...updates,
      updatedAt: new Date().toISOString()
    }
    chapter.lessons.push(updatedLesson)
  }
  
  // 保存课程metadata
  await updateCourseMetadata(courseId, courseMetadata)
  
  return updatedLesson
}

// 缓存课程结构数据
const courseStructureCache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5分钟缓存

/**
 * 清除课程结构缓存
 */
export function clearCourseStructureCache(courseId = null) {
  if (courseId) {
    courseStructureCache.delete(courseId)
  } else {
    courseStructureCache.clear()
  }
}

/**
 * 读取课程文件夹结构（优化版本）
 */
export async function getCourseStructure(courseId) {
  // 检查缓存
  const cacheKey = courseId
  const cached = courseStructureCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  
  const coursePath = path.join(COURSE_BASE_PATH, courseId)
  
  if (!fs.existsSync(coursePath)) {
    throw new Error(`Course directory not found: ${courseId}`)
  }
  
  // 首先尝试从统一的metadata.json读取结构
  const courseMetadata = await getCourseMetadata(courseId)
  
  if (courseMetadata.structure && courseMetadata.structure.chapters) {
    // 使用统一metadata结构，减少文件系统操作
    const structure = {
      courseId,
      chapters: []
    }
    
    // 批量检查章节目录是否存在
    const chapterPaths = new Map()
    for (const chapterData of courseMetadata.structure.chapters) {
      const chapterPath = path.join(coursePath, chapterData.chapterNumber)
      chapterPaths.set(chapterData.chapterNumber, fs.existsSync(chapterPath))
    }
    
    for (const chapterData of courseMetadata.structure.chapters) {
      // 跳过已删除的章节
      if (chapterData.deleted) {
        continue
      }
      
      // 只处理存在的章节
      if (!chapterPaths.get(chapterData.chapterNumber)) {
        continue
      }
      
      const lessons = []
      
      // 批量检查课时文件是否存在
      const lessonPaths = new Map()
      for (const lessonData of chapterData.lessons || []) {
        const lessonMdxPath = path.join(coursePath, chapterData.chapterNumber, lessonData.lessonNumber, 'index.mdx')
        lessonPaths.set(lessonData.lessonNumber, fs.existsSync(lessonMdxPath) ? lessonMdxPath : null)
      }
      
      for (const lessonData of chapterData.lessons || []) {
        // 跳过已删除的课时
        if (lessonData.deleted) {
          continue
        }
        
        const lessonMdxPath = lessonPaths.get(lessonData.lessonNumber)
        
        if (lessonMdxPath) {
          lessons.push({
            lessonNumber: lessonData.lessonNumber,
            path: lessonMdxPath,
            title: lessonData.showName || lessonData.title || lessonData.lessonNumber,
            duration: lessonData.duration || '30分钟',
            videoUrl: lessonData.videoUrl,
            streamId: lessonData.streamId,
            thumbnail: lessonData.thumbnail,
            materials: lessonData.materials || [],
            isPreview: lessonData.isPreview || false,
            requiredRole: lessonData.requiredRole || 'USER',
            url: lessonData.url || `/course/${courseId}/${chapterData.chapterNumber}/${lessonData.lessonNumber}`
          })
        }
      }
      
      // Always add chapter to structure, even if it has no lessons
      structure.chapters.push({
        chapterNumber: chapterData.chapterNumber,
        title: chapterData.showName || chapterData.title || chapterData.chapterNumber,
        description: chapterData.description || '',
        lessons: lessons.sort((a, b) => a.lessonNumber.localeCompare(b.lessonNumber))
      })
    }
    
    // 缓存结果
    courseStructureCache.set(cacheKey, {
      data: structure,
      timestamp: Date.now()
    })
    
    return structure
  }
  
  // 回退到原有的分散metadata读取方式（向后兼容）
  const structure = {
    courseId,
    chapters: []
  }
  
  // 读取所有目录
  const items = fs.readdirSync(coursePath, { withFileTypes: true })
  
  for (const item of items) {
    if (item.isDirectory() && item.name.startsWith('chapter')) {
      const chapterPath = path.join(coursePath, item.name)
      const lessons = []
      
      // 读取章节metadata
      const chapterMetadata = await getChapterMetadata(courseId, item.name)
      
      // 读取章节下的课时
      const chapterItems = fs.readdirSync(chapterPath, { withFileTypes: true })
      
      for (const chapterItem of chapterItems) {
        if (chapterItem.isDirectory() && chapterItem.name.startsWith('lesson')) {
          const lessonMdxPath = path.join(chapterPath, chapterItem.name, 'index.mdx')
          
          if (fs.existsSync(lessonMdxPath)) {
            // 读取lesson的metadata
            const lessonMetadata = await getLessonMetadata(courseId, item.name, chapterItem.name)
            
            lessons.push({
              lessonNumber: chapterItem.name,
              path: lessonMdxPath,
              title: lessonMetadata.showName || lessonMetadata.title || chapterItem.name,
              duration: lessonMetadata.duration || '30分钟',
              videoUrl: lessonMetadata.videoUrl,
              streamId: lessonMetadata.streamId,
              thumbnail: lessonMetadata.thumbnail,
              materials: lessonMetadata.materials || [],
              isPreview: lessonMetadata.isPreview || false,
              requiredRole: lessonMetadata.requiredRole || 'USER',
              url: lessonMetadata.url || `/course/${courseId}/${item.name}/${chapterItem.name}`
            })
          }
        }
      }
      
      structure.chapters.push({
        chapterNumber: item.name,
        title: chapterMetadata.showName || chapterMetadata.title || item.name,
        description: chapterMetadata.description || '',
        lessons: lessons.sort((a, b) => a.lessonNumber.localeCompare(b.lessonNumber))
      })
    }
  }
  
  // 按章节顺序排序
  structure.chapters.sort((a, b) => a.chapterNumber.localeCompare(b.chapterNumber))
  
  return structure
}

/**
 * 读取课时MDX内容
 */
export async function getLessonContent(courseId, chapterNumber, lessonNumber) {
  const lessonPath = path.join(COURSE_BASE_PATH, courseId, chapterNumber, lessonNumber, 'index.mdx')
  
  if (!fs.existsSync(lessonPath)) {
    throw new Error(`Lesson not found: ${courseId}/${chapterNumber}/${lessonNumber}`)
  }
  
  const content = fs.readFileSync(lessonPath, 'utf8')
  return content
}

/**
 * 更新课时MDX内容
 */
export async function updateLessonContent(courseId, chapterNumber, lessonNumber, content) {
  const lessonPath = path.join(COURSE_BASE_PATH, courseId, chapterNumber, lessonNumber, 'index.mdx')
  
  // 确保目录存在
  const lessonDir = path.dirname(lessonPath)
  if (!fs.existsSync(lessonDir)) {
    fs.mkdirSync(lessonDir, { recursive: true })
  }
  
  fs.writeFileSync(lessonPath, content)
  return lessonPath
}

/**
 * 检查课程ID是否可用
 */
export function isCourseIdAvailable(courseId) {
  // 验证courseId格式（只允许字母、数字、中划线）
  const validFormat = /^[a-z0-9-]+$/.test(courseId)
  if (!validFormat) {
    return false
  }
  
  const coursePath = path.join(COURSE_BASE_PATH, courseId)
  return !fs.existsSync(coursePath)
}

/**
 * 重命名章节目录
 */
export async function renameCourseChapter(courseId, oldChapterNumber, newChapterNumber) {
  const coursePath = path.join(COURSE_BASE_PATH, courseId)
  const oldChapterPath = path.join(coursePath, oldChapterNumber)
  const newChapterPath = path.join(coursePath, newChapterNumber)
  
  if (!fs.existsSync(oldChapterPath)) {
    throw new Error(`Chapter directory not found: ${oldChapterNumber}`)
  }
  
  if (fs.existsSync(newChapterPath)) {
    throw new Error(`Chapter directory already exists: ${newChapterNumber}`)
  }
  
  // 重命名目录
  fs.renameSync(oldChapterPath, newChapterPath)
  
  return newChapterPath
}

/**
 * 重命名课时目录
 */
export async function renameCourseLesson(courseId, chapterNumber, oldLessonNumber, newLessonNumber) {
  const chapterPath = path.join(COURSE_BASE_PATH, courseId, chapterNumber)
  const oldLessonPath = path.join(chapterPath, oldLessonNumber)
  const newLessonPath = path.join(chapterPath, newLessonNumber)
  
  if (!fs.existsSync(oldLessonPath)) {
    throw new Error(`Lesson directory not found: ${oldLessonNumber}`)
  }
  
  if (fs.existsSync(newLessonPath)) {
    throw new Error(`Lesson directory already exists: ${newLessonNumber}`)
  }
  
  // 重命名目录
  fs.renameSync(oldLessonPath, newLessonPath)
  
  return newLessonPath
}

/**
 * 获取所有课程ID列表
 */
export function getAllCourseIds() {
  if (!fs.existsSync(COURSE_BASE_PATH)) {
    return []
  }
  
  const items = fs.readdirSync(COURSE_BASE_PATH, { withFileTypes: true })
  return items
    .filter(item => item.isDirectory())
    .map(item => item.name)
    .sort()
}

/**
 * 软删除课程 - 标记为已删除但不删除文件
 */
export async function softDeleteCourse(courseId) {
  const courseMetadata = await getCourseMetadata(courseId)
  
  const updatedMetadata = {
    ...courseMetadata,
    deleted: true,
    deletedAt: new Date().toISOString()
  }
  
  await updateCourseMetadata(courseId, updatedMetadata)
  return updatedMetadata
}

/**
 * 软删除章节 - 标记为已删除但不删除文件
 */
export async function softDeleteChapter(courseId, chapterNumber) {
  const courseMetadata = await getCourseMetadata(courseId)
  
  if (!courseMetadata.structure || !courseMetadata.structure.chapters) {
    throw new Error(`Course structure not found for course ${courseId}`)
  }
  
  const chapterIndex = courseMetadata.structure.chapters.findIndex(
    chapter => chapter.chapterNumber === chapterNumber
  )
  
  if (chapterIndex === -1) {
    throw new Error(`Chapter ${chapterNumber} not found in course ${courseId}`)
  }
  
  // 标记章节为已删除
  courseMetadata.structure.chapters[chapterIndex] = {
    ...courseMetadata.structure.chapters[chapterIndex],
    deleted: true,
    deletedAt: new Date().toISOString()
  }
  
  await updateCourseMetadata(courseId, courseMetadata)
  return courseMetadata.structure.chapters[chapterIndex]
}

/**
 * 软删除课时 - 标记为已删除但不删除文件
 */
export async function softDeleteLesson(courseId, chapterNumber, lessonNumber) {
  const courseMetadata = await getCourseMetadata(courseId)
  
  if (!courseMetadata.structure || !courseMetadata.structure.chapters) {
    throw new Error(`Course structure not found for course ${courseId}`)
  }
  
  const chapterIndex = courseMetadata.structure.chapters.findIndex(
    chapter => chapter.chapterNumber === chapterNumber
  )
  
  if (chapterIndex === -1) {
    throw new Error(`Chapter ${chapterNumber} not found in course ${courseId}`)
  }
  
  const chapter = courseMetadata.structure.chapters[chapterIndex]
  if (!chapter.lessons) {
    throw new Error(`No lessons found in chapter ${chapterNumber}`)
  }
  
  const lessonIndex = chapter.lessons.findIndex(
    lesson => lesson.lessonNumber === lessonNumber
  )
  
  if (lessonIndex === -1) {
    throw new Error(`Lesson ${lessonNumber} not found in chapter ${chapterNumber}`)
  }
  
  // 标记课时为已删除
  chapter.lessons[lessonIndex] = {
    ...chapter.lessons[lessonIndex],
    deleted: true,
    deletedAt: new Date().toISOString()
  }
  
  await updateCourseMetadata(courseId, courseMetadata)
  return chapter.lessons[lessonIndex]
}