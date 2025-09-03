'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

/**
 * 单个课程项组件
 * Args:
 *   lesson: 课程对象
 *   chapterStatus: 章节状态
 *   lessonIndex: 课程序号
 *   onLoginPrompt: 未登录且不可试看时触发的回调
 */
const CourseItem = ({ lesson, chapterStatus, lessonIndex, onLoginPrompt }) => {
  const { data: session } = useSession();
  // 移除升级弹窗状态
  const isLoggedIn = !!session;
  const isAvailable = chapterStatus === 'completed' || chapterStatus === 'update';
  const canPreview = lesson.isPreview === true;

  // 移除权限控制，所有用户都有访问权限
  const has_access = true;

  // 移除升级消息函数

  // 简化点击逻辑，移除权限检查
  const handleClick = (e) => {
    if (!isAvailable) {
      e.preventDefault();
      return;
    }
    // 移除登录和权限检查，所有课程都可以访问
  };

  return (
    <>
      <Link
        href={isAvailable ? lesson.url : '#'}
        onClick={handleClick}
        className={`block mb-3 rounded-lg overflow-hidden relative ${
          isAvailable ? 'transform transition-all duration-300 hover:scale-105' : 'opacity-50 cursor-not-allowed'
        }`}
        style={{
          backgroundImage: 'url(/course_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex text-white p-4 flex-col">
          <span className="text-md text-[#5d31ff] font-medium">第{lessonIndex + 1}课</span>
          <span className="text-2xl font-bold text-[#5d31ff] mb-1">{lesson.title}</span>
          <span className="text-xs text-[#5d31ff]">{lesson.duration}</span>
        </div>
        {/* 试看标签 */}
        {canPreview && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-md font-semibold tracking-wider z-10 select-none">
            试看
          </span>
        )}

      </Link>

    </>
  );
};

export default CourseItem; 