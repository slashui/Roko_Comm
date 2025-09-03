// ClientLayout.js
'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Aside from '@/components/Aside'
import Providers from '@/libs/themes/providers'

export default function ClientLayout({ children, params }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const locale = params.locale
  const pathname = usePathname()
  
  // 检查是否是课程详情页面
  const isCourseDetailPage = pathname && /\/course\/[^\/]+\/[^\/]+/.test(pathname)

  return (
    <Providers>
      <div className="flex flex-row w-full h-screen relative">
        {/* 汉堡菜单按钮 */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* 移动端遮罩层 */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* 主内容区域 */}
        <div className={`
          flex-1 overflow-auto h-screen w-full bg-neutral-bg dark:bg-dark-neutral-bg
          ${isCourseDetailPage ? 'w-full' : ''}
        `}>
          {isCourseDetailPage ? (
            // 课程页面：直接显示内容，不加额外的容器样式
            children
          ) : (
            // 普通页面：使用原来的样式
            <div className="overflow-x-scroll scrollbar-hide flex markdown flex-col dark:bg-[#d9cfff] bg-gray-100 justify-between">
              {children}
            </div>
          )}
        </div>
      </div>
    </Providers>
  )
}