"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import courseData from '@/libs/course.json'

const Aside = ({ locale }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [expandedChapter, setExpandedChapter] = useState('chapter3')

  // 权限等级定义
  const ROLE_LEVELS = {
    'free': 0,
    'prime': 1,
    'vip': 2
  };

  // 检查用户是否有权限访问内容
  const hasAccess = (userRole, requiredRole) => {
    const userLevel = ROLE_LEVELS[userRole?.toLowerCase()] || 0;
    const requiredLevel = ROLE_LEVELS[requiredRole?.toLowerCase()] || 0;
    
    return userLevel >= requiredLevel;
  };

  // 检查章节是否应该显示 - 完全严格匹配模式
  const shouldShowChapter = (userRole, chapterRequiredRole) => {
    const userRoleLower = userRole?.toLowerCase() || 'free';
    const requiredRoleLower = chapterRequiredRole?.toLowerCase() || 'free';
    
    // 完全严格匹配：用户角色必须完全匹配章节要求
    return userRoleLower === requiredRoleLower;
  };

  // 检查章节是否有可见内容
  const hasVisibleContent = (chapter, userRole) => {
    return shouldShowChapter(userRole, chapter.requiredRole);
  };

  const toggleChapter = (chapter) => {
    if (expandedChapter === chapter.id) {
      setExpandedChapter(null)
    } else {
      setExpandedChapter(chapter.id)
    }
  }

  const renderLessons = (lessons) => {
    // 显示章节下的所有课程，不再过滤
    return lessons.map((lesson, index) => (
      <Link href={lesson.url} key={index}>
        <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
          <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{lesson.title}</span>
            <span className="text-xs text-gray-600">({lesson.duration})</span>
          </div>
        </li>
      </Link>
    ))
  }

  const renderSection = (section) => {
    // 显示所有段落和课程，不再过滤
    return (
      <div key={section.title}>
        <li className='font-bold text-sm text-gray-400'>{section.title} ({section.duration})</li>
        {renderLessons(section.lessons)}
      </div>
    )
  }

  const handleLogout = async () => {
    try {
      // 先清除本地存储
      localStorage.clear()
      sessionStorage.clear()

      // 使用 signOut 但不自动重定向
      await signOut({ redirect: false })

      // 手动跳转到登录页面
      router.push(`/${locale}/login`)
    } catch (error) {
      console.error('Logout error:', error)
      // 如果出错，也尝试跳转到登录页面
      router.push(`/${locale}/login`)
    }
  }

  const handleLogin = () => {
    router.push(`/${locale}/login`)
  }

  return (
    <div className="flex flex-col h-screen bg-[#fff] border-r-2 border-dark overflow-auto relative">
      <div className="flex-1">
        <Link href="/" className="block m-8">
          <img src="/logo.png" className="w-[120px]" alt="Logo" />
        </Link>

        <nav className="space-y-3">
          <div className="space-y-0">
            {courseData.chapters
              .map((chapter) => {
              const chapterHasContent = true; // 所有章节都显示

              return (
                <div key={chapter.id} className="overflow-hidden">
                  <div
                    className={`w-full flex items-center justify-between p-3 py-5 transition-all duration-200
                      ${!chapterHasContent
                        ? 'pointer-events-none opacity-50'
                        : 'hover:bg-[#9458FE]/10 cursor-pointer'
                      } 
                      border-t-2 border-b-1 border-gray-300`}
                    onClick={() => chapterHasContent && toggleChapter(chapter)}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${!chapterHasContent ? 'text-gray-400' : 'text-[#302645]'
                        }`}>
                        ({chapter.id.replace('chapter', '')}){chapter.title}
                      </span>
                    </div>
                    {chapterHasContent && (
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${expandedChapter === chapter.id ? 'transform rotate-180' : ''
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>

                  {chapterHasContent && (
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedChapter === chapter.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                      <div className="p-3 text-xs text-gray-600">{chapter.description}</div>
                      <ul className="px-3 pb-3 space-y-2">
                        {chapter.sections ?
                          chapter.sections.map(section => renderSection(section)).filter(Boolean) :
                          renderLessons(chapter.lessons)
                        }
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
        
        {/* 用户信息显示 - 扁平化设计 */}
        {session && (
          <div className="mx-4 mt-6 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500">当前用户</div>
                <div className="text-sm font-medium text-gray-800 truncate" title={session.user?.email}>
                  {session.user?.email}
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-medium ml-2 ${
                session.user?.role === 'VIP' ? 'bg-orange-100 text-orange-700' :
                session.user?.role === 'PRIME' ? 'bg-purple-100 text-purple-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {session.user?.role || 'FREE'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white hover:bg-gray-100 rounded border transition-colors"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3h9Zm3-10H5a2 2 0 0 0-2 2v6h2V5h14v14H5v-6H3v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
              </svg>
              退出登录
            </button>
          </div>
        )}
      </div>

      {/* 原有退出按钮区域保持隐藏 */}
      <div className="border-t border-gray-200 p-4 mt-auto hidden">
        {session ? (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#5d31ff] hover:bg-[#4a28d9] rounded-lg transition-colors font-bold justify-center shadow-md"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3h9Zm3-10H5a2 2 0 0 0-2 2v6h2V5h14v14H5v-6H3v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" /></svg>
            <span className="text-sm font-medium">退出登录</span>
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full flex items-center gap-3 px-4 py-2 text-white bg-[#5d31ff] hover:bg-[#4a28d9] rounded-lg transition-colors font-bold justify-center shadow-md"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3h9Zm3-10H5a2 2 0 0 0-2 2v6h2V5h14v14H5v-6H3v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" /></svg>
            <span className="text-sm font-medium">我要登录</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Aside