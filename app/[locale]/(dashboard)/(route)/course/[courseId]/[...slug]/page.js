'use client'

import CourseTemplate from '@/components/CourseTemplate'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'

export default function CoursePage({ params }) {
  const { data: session } = useSession()
  const [courseData, setCourseData] = useState(null)
  const [lessonData, setLessonData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  
  const { courseId, slug: rawSlug, locale } = params
  const slug = Array.isArray(rawSlug) ? rawSlug.join('/') : rawSlug
  const chapterNumber = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug?.split('/')[0]
  const lessonNumber = Array.isArray(rawSlug) ? rawSlug[1] : rawSlug?.split('/')[1]

  console.log('Course Page Params:', { courseId, slug, chapterNumber, lessonNumber, locale })
  
  const loadCourse = useCallback(async () => {
    console.log('Loading course data...')
    try {
      setLoading(true)
      
      // 首先检查用户是否有课程访问权限
      if (session?.user?.id) {
        console.log('Checking course access for user:', session.user.id)
        const accessResponse = await fetch('/api/course-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user.id,
            courseId: courseId
          })
        })
        
        if (accessResponse.ok) {
          const accessData = await accessResponse.json()
          console.log('Course access check result:', accessData)
          
          if (!accessData.hasAccess) {
            console.log('User does not have access to this course')
            setError(new Error('No access to this course'))
            return
          }
          
          // 如果有访问权限，使用返回的课程结构数据
          if (accessData.courseStructure) {
            setCourseData({
              ...accessData.courseStructure,
              title: accessData.course.title,
              description: accessData.course.description,
              courseId: accessData.course.courseId
            })
          }
        } else {
          console.error('Failed to check course access')
          setError(new Error('Failed to verify course access'))
          return
        }
      } else {
        // 如果用户未登录，尝试获取课程基本信息（仅用于预览）
        const courseResponse = await fetch(`/api/courses?courseId=${courseId}&includeStructure=true`)
        if (courseResponse.ok) {
          const courseInfo = await courseResponse.json()
          setCourseData({
            ...courseInfo.fileSystemStructure,
            title: courseInfo.title,
            description: courseInfo.description,
            courseId: courseInfo.courseId
          })
        } else {
          console.error('Failed to load course structure')
          setError(new Error('Course not found'))
          return
        }
      }
      
      // 如果指定了具体的章节和课时，获取MDX内容
      if (chapterNumber && lessonNumber) {
        try {
          const contentResponse = await fetch(`/api/courses/${courseId}/content?chapter=${chapterNumber}&lesson=${lessonNumber}`)
          if (contentResponse.ok) {
            const contentData = await contentResponse.json()
            setLessonData(contentData)
          } else {
            console.error('Failed to load lesson content')
          }
        } catch (contentError) {
          console.error('Error loading lesson content:', contentError)
        }
      }
      
    } catch (error) {
      console.error('Course loading error:', error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [courseId, chapterNumber, lessonNumber, session?.user?.id])

  useEffect(() => {
    loadCourse()
  }, [loadCourse])

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* 左侧导航骨架屏 */}
        <div className="w-full lg:w-80 bg-white border-r border-gray-200 p-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 主内容区域骨架屏 */}
        <div className="flex-1 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-1/2"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">访问受限</h2>
          <p className="mb-6 text-gray-600">
            {error.message === 'No access to this course' 
              ? '您没有此课程的访问权限，请先购买或联系管理员。' 
              : '加载课程时出现错误，请稍后重试。'
            }
          </p>
          <button
            className="bg-[#5d31ff] hover:bg-[#4a28d9] text-white px-6 py-2 rounded-full font-bold transition-colors"
            onClick={() => router.push(`/${locale}/dashboard`)}
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  if (!courseData) {
    return null
  }

  // 找到当前章节和课时
  const currentChapter = courseData.chapters?.find(c => c.chapterNumber === chapterNumber)
  const currentLesson = currentChapter?.lessons?.find(l => l.lessonNumber === lessonNumber)

  // 如果没有指定具体课时，显示课程概览或第一个课时
  if (!chapterNumber || !lessonNumber) {
    const firstChapter = courseData.chapters?.[0]
    const firstLesson = firstChapter?.lessons?.[0]
    if (firstChapter && firstLesson) {
      router.replace(`/${locale}/course/${courseId}/${firstChapter.chapterNumber}/${firstLesson.lessonNumber}`)
      return null
    }
  }

  // 检查预览权限
  const canPreview = currentLesson?.isPreview === true
  const isLoggedIn = !!session

  if (!canPreview && !isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">请先登录</h2>
          <p className="mb-6 text-gray-600">本课程需要登录后才能观看。</p>
          <button
            className="bg-[#5d31ff] hover:bg-[#4a28d9] text-white px-6 py-2 rounded-full font-bold transition-colors"
            onClick={() => router.push(`/${locale}/login`)}
          >
            去登录
          </button>
        </div>
      </div>
    )
  }

  return (
    <CourseTemplate
      courseId={courseId}
      courseData={courseData}
      chapterNumber={chapterNumber}
      lessonNumber={lessonNumber}
      currentChapter={currentChapter}
      currentLesson={currentLesson}
      lessonContent={lessonData?.content}
      locale={locale}
    />
  )
}