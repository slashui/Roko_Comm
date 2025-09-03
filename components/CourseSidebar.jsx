import React, { useState } from 'react'
import Link from 'next/link'

// SVG 图标组件
const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ChevronRightIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const BookOpenIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const CourseSidebar = ({ courseId, courseData, currentChapter, currentLesson, locale, onClose }) => {
  const [expandedChapters, setExpandedChapters] = useState(new Set([currentChapter]))
  


  const toggleChapter = (chapterNumber) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterNumber)) {
      newExpanded.delete(chapterNumber)
    } else {
      newExpanded.add(chapterNumber)
    }
    setExpandedChapters(newExpanded)
  }

  if (!courseData) {
    return (
      <div className="fixed left-0 top-0 w-80 h-full bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="animate-pulse">加载中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-pink-50 border-r-2 border-pink-200 overflow-auto relative w-80 flex-shrink-0 shadow-lg">
      {/* 移动端关闭按钮 */}
      <div className="lg:hidden absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="p-2 bg-pink-100 rounded-xl hover:bg-pink-200 shadow-sm transition-all duration-300"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1">
        {/* Logo区域 */}
        <div className="block m-8">
          <img src="/logo.png" className="w-[120px]" alt="Logo" />
        </div>

        {/* 课程标题 */}
        <div className="mx-8 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpenIcon className="w-6 h-6 text-pink-500" />
            <h2 className="text-lg font-bold text-[#302645]">
              {courseData?.title || `课程 ${courseId}`}
            </h2>
          </div>
          <p className="text-sm text-gray-600">
            共 {courseData?.chapters?.length || 0} 章节
          </p>
        </div>

        {/* 章节列表 */}
        <nav className="space-y-3">
          <div className="space-y-0">
            {courseData?.chapters?.map((chapter) => (
              <div key={chapter.chapterNumber} className="overflow-hidden">
                {/* 章节标题 */}
                <div
                  className={`w-full flex items-center justify-between p-3 py-5 transition-all duration-200
                    hover:bg-[#9458FE]/10 cursor-pointer border-t-2 border-b-1 border-gray-300`}
                  onClick={() => toggleChapter(chapter.chapterNumber)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#302645]">
                      第{chapter.chapterNumber.replace('chapter', '')}章 {chapter.title || chapter.chapterNumber}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 text-[#9458FE] ${
                        expandedChapters.has(chapter.chapterNumber) ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* 课时列表 */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedChapters.has(chapter.chapterNumber) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-3 text-xs text-pink-600 font-medium">🌸 课时列表</div>
                  <ul className="px-3 pb-3 space-y-2">
                    {chapter.lessons?.map((lesson) => {
                      const isCurrentLesson = currentChapter === chapter.chapterNumber && currentLesson === lesson.lessonNumber
                      return (
                        <Link
                          key={lesson.lessonNumber}
                          href={`/${locale}/course/${courseId}/${chapter.chapterNumber}/${lesson.lessonNumber}`}
                        >
                          <li className={`flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer group ${
                            isCurrentLesson 
                              ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md' 
                              : 'hover:bg-pink-50'
                          }`}>
                            <img 
                              src="/play.svg" 
                              className={`w-4 h-4 flex-shrink-0 ${
                                isCurrentLesson ? 'filter brightness-0 invert' : 'text-gray-400'
                              }`} 
                              alt="播放" 
                            />
                            <div className="flex items-center gap-1">
                              <span className={`text-sm font-medium ${
                                isCurrentLesson ? 'text-white' : 'text-gray-900'
                              }`}>
                                {lesson.lessonNumber}
                              </span>
                              {lesson.duration && (
                                <span className={`text-xs ${
                                  isCurrentLesson ? 'text-purple-100' : 'text-gray-600'
                                }`}>
                                  ({lesson.duration})
                                </span>
                              )}
                            </div>
                            {lesson.isPreview && (
                              <span className={`ml-auto px-2 py-1 text-xs rounded ${
                                isCurrentLesson 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                预览
                              </span>
                            )}
                          </li>
                        </Link>
                      )
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default CourseSidebar