"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Aside = ({ locale }) => {
  const [expandedChapter, setExpandedChapter] = useState('chapter1')

  const toggleChapter = (chapter) => {
    if (expandedChapter === chapter) {
      setExpandedChapter(null)
    } else {
      setExpandedChapter(chapter)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#fff] border-r-2 border-dark overflow-auto">
      <div className="">
        <Link href="/" className="block m-8">
          <img src="/logo.png" className="w-[120px]" alt="Logo" />
        </Link>
        
        <nav className="space-y-3">
          {/* 课程大纲部分 */}
          <div className=" space-y-0">
            {/* 第1章 */}
            <div className=" overflow-hidden">
              <button 
                onClick={() => toggleChapter('chapter1')} 
                className="w-full flex items-center justify-between p-3 py-5 hover:bg-[#9458FE]/10 border-t-2 border-b-1 border-gray-300 transition-all duration-200"              >
                <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#302645]">(1)课程简介</span>
                
              </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${expandedChapter === 'chapter1' ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedChapter === 'chapter1' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-3 text-xs text-gray-600">目标：介绍课程目标、AI编程基础及学习路径。</div>
                <ul className="px-3 pb-3 space-y-3">
                <Link href="/cn/courses/chapter1/lesson1">
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">课程介绍和学习目标</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  </Link>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">什么是AI编程？</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">AI编程与传统编程的区别</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">AI不是代替你的工具 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">AI编程可以编什么？</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">我是小白可以编程吗？</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">课程资源</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* 第2章 */}
            <div className=" overflow-hidden">
              <button 
                onClick={() => toggleChapter('chapter2')} 
                className="w-full flex items-center justify-between p-3 py-5  hover:bg-[#9458FE]/10 border-t-2 border-b-1 border-gray-300 transition-all duration-200"              >
                <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#302645]">(2)AI编程工具的种类</span>
              </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${expandedChapter === 'chapter2' ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedChapter === 'chapter2' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-3  text-xs text-gray-600">目标：了解主流AI编程工具的特点及适用场景。</div>
                <ul className="px-3 pb-3 space-y-2">
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">AI编程常用工具简介</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">什么是Cursor</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">如何用DeepSeek进行AI编程</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Cursor与Bolt.new对比 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Bolt.new IDE简介</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Windsurf简介（由Codium提供） </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                 
                </ul>
              </div>
            </div>
            {/* 第三章 */}
            <div className=" overflow-hidden">
              <button 
                onClick={() => toggleChapter('chapter3')} 
                className="w-full flex items-center justify-between p-3 py-5  hover:bg-[#9458FE]/10 border-t-2 border-b-1 border-gray-300 transition-all duration-200"              >
                <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#302645]">(3)Cursor的基本安装使用</span>
              </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${expandedChapter === 'chapter3' ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedChapter === 'chapter3' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-3 text-xs text-gray-600">目标：掌握Cursor的安装、配置及基础操作。</div>
                <ul className="px-3 pb-3 space-y-2">
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Cursor注册账号 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Cursor安装与配置 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Cursor基础使用指南 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">设置WorkSpace </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Cursor实用功能</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Cursor隐私与支持</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Cursor定价购买</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">OMG,用语音编程</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                 
                </ul>
              </div>
            </div>
            {/* 第四章 */}
            <div className=" overflow-hidden">
              <button 
                onClick={() => toggleChapter('chapter4')} 
                className="w-full flex items-center justify-between p-3 py-5  hover:bg-[#9458FE]/10 border-t-2 border-b-1 border-gray-300 transition-all duration-200"              >
                <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#302645]">(4)小白程序员必看</span>
              </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${expandedChapter === 'chapter4' ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedChapter === 'chapter4' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-3 text-xs text-gray-600">目标：为初学者打下编程基础，介绍Python、NextJS及GitHub（含Git）的使用。</div>
                <ul className="px-3 pb-3 space-y-2">
                <li className='font-bold text-sm text-gray-400'>Python基础 (30分钟)</li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Python简介与环境搭建</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">第一个Python程序</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">数据类型与操作 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">变量、函数与模块 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className='font-bold text-sm text-gray-400'>NextJS基础 (30分钟)</li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">NextJS技术栈简介 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">NextJS项目创建</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">NextJS项目结构</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className='font-bold text-sm text-gray-400'>Git与GitHub基础 (40分钟)</li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Git与GitHub简介</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Git基础操作</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">分支管理 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 第五章 */}
            <div className=" overflow-hidden">
              <button 
                onClick={() => toggleChapter('chapter5')} 
                className="w-full flex items-center justify-between p-3 py-5  hover:bg-[#9458FE]/10 border-t-2 border-b-1 border-gray-300 transition-all duration-200"              >
                <div className="flex items-lift gap-2">
                <span className="text-sm font-bold text-[#302645]">(5)[初级]从代码生成到SEO网站部署</span>
              </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${expandedChapter === 'chapter5' ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedChapter === 'chapter5' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-3 text-xs text-gray-600">目标：掌握Cursor的安装、配置及基础操作。</div>
                <ul className="px-3 pb-3 space-y-2">
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">用Cursor编写Python程序</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">用Cursor开发NextJS页面</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">连接大模型API </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">数据库集成</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">代码优化与调试 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">项目实战：SEO优化网站 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">调试与改进</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                 
                 
                </ul>
              </div>
            </div>

            {/* 第六章 */}
            <div className=" overflow-hidden">
              <button 
                onClick={() => toggleChapter('chapter6')} 
                className="w-full flex items-center justify-between p-3 py-5 hover:bg-[#9458FE]/10 border-t-2 border-b-1 border-gray-300 transition-all duration-200"              >
                <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#302645]">(6)[中级]工作流与内容生成实战</span>
              </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${expandedChapter === 'chapter6' ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedChapter === 'chapter6' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-3 text-xs text-gray-600">目标：掌握Cursor高级功能，探索AI驱动的工作流与内容生成。</div>
                <ul className="px-3 pb-3 space-y-2">
                <li className='font-bold text-sm text-gray-400'>工作流基础 (20分钟)</li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">利用Cursor组织工作流 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">与LangChain结合实现工作流 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">嵌入Coze平台 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className='font-bold text-sm text-gray-400'>AI内容生成 (26分钟)</li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">用Cursor生成短视频 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">用Cursor撰写爆款文章 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">用Cursor生成小红书图片</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className='font-bold text-sm text-gray-400'>高级功能与实战项目 (30分钟)</li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">项目实战：需求分析 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">项目实战：开发过程 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">项目实战：运行与优化 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>


            {/* 第七章 */}
            <div className=" overflow-hidden">
              <button 
                onClick={() => toggleChapter('chapter7')} 
                className="w-full flex items-center justify-between p-3 py-5 hover:bg-[#9458FE]/10 border-t-2 border-b-1 border-gray-300 transition-all duration-200"              >
                <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#302645]">(7)[高级]AI Agent与复杂项目开发</span>
              </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${expandedChapter === 'chapter7' ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedChapter === 'chapter7' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-3 text-xs text-gray-600">目标：掌握AI Agent、MCP及复杂项目开发，完成"与神对话"应用的全流程构建。</div>
                <ul className="px-3 pb-3 space-y-2">
                <li className='font-bold text-sm text-gray-400'>AI Agent与MCP基础 (40分钟)</li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">AI Agent的概念与应用</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">如何使用Cursor Agent </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">MCP简介 </span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">在Cursor中使用MCP</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className='font-bold text-sm text-gray-400'>MCP进阶应用 (35分钟)</li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">网络上的MCP资源探索</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">自己搭建MCP环境</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">高级补充内容</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className='font-bold text-sm text-gray-400'>项目实战："与神对话"应用 (45分钟)</li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">需求分析与平台搭建</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">功能开发与大模型集成</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <img src="/play.svg" className="w-4 h-4 text-gray-400 flex-shrink-0" alt="播放" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">部署优化与上线</span>
                      <span className="text-xs text-gray-600">(06:55)</span>
                    </div>
                  </li>
                 
                </ul>
              </div>
            </div>




          </div>
        </nav>
      </div>
      </div>
  )
}

export default Aside