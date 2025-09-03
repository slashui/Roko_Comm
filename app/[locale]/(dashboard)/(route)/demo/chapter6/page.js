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
     aa
    </div>
  )
}