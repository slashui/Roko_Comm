import React from 'react'
import VideoPlayer from '@/components/VideoPlayer'

import { MDXRemote } from 'next-mdx-remote'
import AliPlayer from '@/components/AliPlayer'

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

const DocsTemplate = ({ 
  chapterId, 
  lessonUrl, 
  content,  // markdown内容
  frontmatter // markdown的元数据
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      

<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <div className="aspect-w-16 aspect-h-9 mb-8">
    <div className="w-full bg-gray-100 rounded-lg">
    <AliPlayer vid={frontmatter.vid} />
    </div>
  </div>

  <div className="prose max-w-none">
    <MDXRemote 
      {...content} 
      components={components}
      scope={frontmatter}
    />
  </div>

        {/* 下载资源部分 */}
        {frontmatter.downloads && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">课程资料</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {frontmatter.downloads.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <a 
                      href={item.file}
                      download
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocsTemplate