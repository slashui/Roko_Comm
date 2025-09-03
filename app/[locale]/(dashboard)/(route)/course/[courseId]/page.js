'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function CourseOverviewPage({ params }) {
  const { data: session } = useSession()
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  const { courseId, locale } = params

  useEffect(() => {
    const loadCourse = async () => {
      try {
        // 获取课程结构
        const courseResponse = await fetch(`/api/courses?courseId=${courseId}&includeStructure=true`)
        if (courseResponse.ok) {
          const courseInfo = await courseResponse.json()
          setCourseData(courseInfo)
          
          // 自动重定向到第一个章节的第一个课时
          if (courseInfo.fileSystemStructure?.chapters?.length > 0) {
            const firstChapter = courseInfo.fileSystemStructure.chapters[0]
            if (firstChapter.lessons?.length > 0) {
              const firstLesson = firstChapter.lessons[0]
              router.replace(`/${locale}/course/${courseId}/${firstChapter.chapterNumber}/${firstLesson.lessonNumber}`)
              return
            }
          }
        }
      } catch (error) {
        console.error('Failed to load course:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [courseId, locale, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-pink-700 font-medium">课程加载中...</p>
        </div>
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full mx-4 text-center border border-pink-200">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
            <span className="text-4xl">📚</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">课程未找到</h2>
          <p className="mb-8 text-gray-600 text-lg leading-relaxed">无法找到指定的课程内容。</p>
          <button
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => router.push(`/${locale}/dashboard`)}
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  // 根据课程状态和章节情况显示不同内容
  const courseStatus = courseData.status || courseData.metadata?.status || 'DRAFT';
  const hasChapters = courseData.fileSystemStructure?.chapters?.length > 0;
  
  // 如果课程状态为草稿或没有章节，显示相应提示
  if (courseStatus === 'DRAFT' || !hasChapters) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          {/* 主要内容卡片 */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-pink-200">
            {/* 装饰性图标 */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-pink-200 to-purple-200 flex items-center justify-center">
              <span className="text-5xl">{courseStatus === 'DRAFT' ? '🚧' : '📚'}</span>
            </div>
            
            {/* 课程标题 */}
            <h1 className="text-4xl font-bold mb-6 text-gray-900">{courseData.title}</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{courseData.description}</p>
            
            {/* 状态提示 */}
            {courseStatus === 'DRAFT' ? (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-8 mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-200 to-yellow-200 flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
                <h2 className="text-2xl font-semibold text-orange-800 mb-4">课程开发中</h2>
                <p className="text-orange-700 text-lg leading-relaxed">
                  此课程正在开发中，暂未发布。请等待管理员发布课程。
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">课程内容准备中</h2>
                <p className="text-blue-700 text-lg leading-relaxed">
                  课程已发布，但暂无章节内容。请联系管理员添加课程内容。
                </p>
              </div>
            )}
          
          {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => router.push(`/${locale}/dashboard`)}
              >
                返回课程中心
              </button>
              <button
                className="bg-white border-2 border-pink-300 text-pink-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 px-8 py-3 rounded-full font-bold transition-all duration-300"
                onClick={() => window.location.href = 'mailto:admin@example.com'}
              >
                联系管理员
              </button>
            </div>
          </div>
          
          {/* 底部装饰 */}
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 rounded-full bg-pink-300 opacity-60"></div>
              <div className="w-3 h-3 rounded-full bg-purple-300 opacity-60"></div>
              <div className="w-3 h-3 rounded-full bg-pink-300 opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // 如果课程已发布且有章节，正常显示课程内容
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-green-200">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center">
            <span className="text-5xl">✅</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 text-gray-900">{courseData.title}</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{courseData.description}</p>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">课程已发布</h2>
            <p className="text-green-700 text-lg leading-relaxed">
              课程内容已准备就绪，即将为您跳转到第一章节。
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => {
                const firstChapter = courseData.fileSystemStructure.chapters[0]
                if (firstChapter.lessons?.length > 0) {
                  const firstLesson = firstChapter.lessons[0]
                  router.push(`/${locale}/course/${courseId}/${firstChapter.chapterNumber}/${firstLesson.lessonNumber}`)
                }
              }}
            >
              开始学习
            </button>
            <button
              className="bg-white border-2 border-green-300 text-green-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 px-8 py-3 rounded-full font-bold transition-all duration-300"
              onClick={() => router.push(`/${locale}/dashboard`)}
            >
              返回课程中心
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}