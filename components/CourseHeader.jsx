import React from 'react'
import Link from 'next/link'

const CourseHeader = ({ courseData, currentChapter, currentLesson, locale }) => {
  if (!courseData || !currentChapter || !currentLesson) {
    return <div>课程信息加载中...</div>
  }

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100">
      <div className="flex items-center gap-2 text-sm text-pink-600 mb-2">
        <Link href={`/${locale}/dashboard`} className="hover:text-pink-700 transition-colors">
          {courseData.title || '课程'}
        </Link>
        <span>/</span>
        <span className="hover:text-pink-700 transition-colors">
          {currentChapter.chapterNumber}
        </span>
        <span>/</span>
        <span className="text-gray-900">
          {currentLesson.lessonNumber}
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-gray-800 flex items-center">
        <span className="text-2xl mr-3">🎂</span>
        {currentLesson.title || currentLesson.lessonNumber}
      </h1>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>时长：{currentLesson.duration || '30分钟'}</span>
      </div>
    </div>
  )
}

export default CourseHeader