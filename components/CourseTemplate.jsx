import React, { useState, useEffect } from 'react'
import VideoPlayer from '@/components/VideoPlayer'
import CourseHeader from '@/components/CourseHeader'
import CourseSidebar from '@/components/CourseSidebar'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import EnhancedCloudflarePlayer from '@/components/EnhancedCloudflarePlayer'

const components = {
  h1: (props) => <h1 className="text-3xl font-bold my-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold my-3" {...props} />,
  p: (props) => <p className="my-2" {...props} />,
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
}

const CourseTemplate = ({ 
  courseId,
  courseData,
  chapterNumber, 
  lessonNumber,
  currentChapter,
  currentLesson,
  lessonContent,  // 原始MDX字符串
  locale
}) => {
  const [mdxSource, setMdxSource] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [frontmatterData, setFrontmatterData] = useState(null)
  
  console.log('CourseTemplate received:', { courseId, chapterNumber, lessonNumber, currentLesson });
  console.log('frontmatterData:', frontmatterData);
  console.log('videoUrl from frontmatter:', frontmatterData?.videoUrl);
  console.log('videoUrl from currentLesson:', currentLesson?.videoUrl);

  // 处理MDX内容
  useEffect(() => {
    if (lessonContent) {
      setIsProcessing(true)
      
      // 检查是否是服务端预处理的数据
      if (typeof lessonContent === 'object' && lessonContent.processed) {
        // 使用服务端预处理的数据
        setMdxSource(lessonContent.mdxSource)
        setFrontmatterData(lessonContent.frontmatter)
        setIsProcessing(false)
      } else if (typeof lessonContent === 'string') {
        // 客户端处理（回退方案）
        try {
          // 使用gray-matter解析frontmatter
          const { data: frontmatter, content } = matter(lessonContent)
          console.log('Parsed frontmatter with gray-matter:', frontmatter)
          
          // 序列化内容
          serialize(content)
            .then((result) => {
              setMdxSource(result)
              setFrontmatterData(frontmatter)
            })
            .catch(console.error)
            .finally(() => setIsProcessing(false))
        } catch (error) {
          console.error('Error parsing MDX:', error)
          setIsProcessing(false)
        }
      } else {
        setMdxSource(null)
        setFrontmatterData(null)
        setIsProcessing(false)
      }
    } else {
      setMdxSource(null)
      setFrontmatterData(null)
      setIsProcessing(false)
    }
  }, [lessonContent])
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  console.log('Mobile menu state:', isMobileMenuOpen)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* 移动端遮罩层 */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[45] lg:hidden"
          onClick={() => {
            console.log('Overlay clicked, closing menu')
            setIsMobileMenuOpen(false)
          }}
        />
      )}
      
      {/* 左侧导航 */}
      <div className={`
        fixed lg:relative lg:w-80 w-80 h-screen z-[55]
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <CourseSidebar 
          courseId={courseId}
          courseData={courseData}
          currentChapter={chapterNumber}
          currentLesson={lessonNumber}
          locale={locale}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
      
      {/* 主内容区 */}
      <div className="flex-1 overflow-auto lg:ml-0">
        {/* 移动端菜单按钮 */}
        <div className="lg:hidden fixed top-4 left-4 z-[60]">
          <button
            onClick={() => {
              console.log('Menu button clicked, current state:', isMobileMenuOpen)
              setIsMobileMenuOpen(true)
            }}
            className="p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        <div className="max-w-6xl mx-auto py-8 px-6">
          <CourseHeader 
            courseData={courseData}
            currentChapter={currentChapter}
            currentLesson={currentLesson}
            locale={locale}
          />

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-pink-100">
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="w-full bg-gray-100 rounded-lg">
                <EnhancedCloudflarePlayer 
                  videoUrl={currentLesson?.videoUrl} 
                  streamId={currentLesson?.streamId}
                  thumbnail={currentLesson?.thumbnail}
                />
              </div>
            </div>

            {/* 课件材料区域 */}
            {currentLesson?.materials && currentLesson.materials.length > 0 && (
              <div className="mb-6 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <span className="text-xl mr-2">📚</span>
                  课件资料
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentLesson.materials.map((material, index) => (
                    <div key={index} className="flex items-center p-4 bg-white border border-pink-200 rounded-xl hover:shadow-lg hover:border-pink-300 transition-all duration-300">
                      <div className="flex-shrink-0 mr-3 text-2xl">
                        {material.type?.includes('pdf') ? '📄' : 
                         material.type?.includes('word') || material.type?.includes('document') ? '📝' :
                         material.type?.includes('excel') || material.type?.includes('sheet') ? '📊' :
                         material.type?.includes('powerpoint') || material.type?.includes('presentation') ? '📊' :
                         material.type?.includes('image') ? '🖼️' :
                         material.type?.includes('zip') || material.type?.includes('rar') ? '🗜️' : '📎'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{material.originalName}</h4>
                        <p className="text-xs text-gray-500">
                          {material.size ? `${(material.size / 1024 / 1024).toFixed(2)} MB` : ''}
                        </p>
                      </div>
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-3 py-1 text-xs bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-sm"
                      >
                        下载
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isProcessing ? (
              <div className="prose max-w-none">
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <span className="ml-2">加载课程内容...</span>
                </div>
              </div>
            ) : mdxSource ? (
              <div className="prose max-w-none">
                <MDXRemote 
                  {...mdxSource} 
                  components={components}
                />
              </div>
            ) : lessonContent ? (
              <div className="prose max-w-none">
                <div className="text-red-600">MDX内容处理出错</div>
              </div>
            ) : null}

          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseTemplate