'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function Chapter1() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect('/login')
  }

  const lessons = [
    {
      id: 1,
      title: '课程介绍和学习目标',
      duration: '06:55',
      path: '/dashboard/chapter1/lesson1'
    },
    {
      id: 2,
      title: '什么是AI编程？',
      duration: '06:55',
      path: '/dashboard/chapter1/lesson2'
    },
    // ... 其他课程
  ]

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">第一章：课程简介</h1>
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <h2 className="font-bold mb-2">章节目标</h2>
        <p>介绍课程目标、AI编程基础及学习路径。</p>
      </div>

      <div className="space-y-4">
        {lessons.map(lesson => (
          <Link href={lesson.path} key={lesson.id}>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">时长：{lesson.duration}</p>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}