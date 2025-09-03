'use client'
import React, { useState } from 'react';
import CourseItem from './CourseItem';

/**
 * 课程列表组件
 * Args:
 *   chapter: 章节对象
 *   onLoginPrompt: 未登录且不可试看时触发的回调
 */
const CourseList = ({ chapter, onLoginPrompt }) => {
  // 支持章节下有 sections 或直接 lessons
  if (chapter.sections) {
    return (
      <div className="space-y-6">
        {chapter.sections.map((section) => (
          <div key={section.title}>
            <h5 className="font-bold text-sm text-gray-500 mb-2">{section.title}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.lessons.map((lesson, lessonIndex) => (
                <CourseItem
                  key={lesson.url}
                  lesson={lesson}
                  chapterStatus={chapter.status}
                  lessonIndex={lessonIndex}
                  onLoginPrompt={onLoginPrompt}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  // 直接 lessons
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {chapter.lessons.map((lesson, lessonIndex) => (
        <CourseItem
          key={lesson.url}
          lesson={lesson}
          chapterStatus={chapter.status}
          lessonIndex={lessonIndex}
          onLoginPrompt={onLoginPrompt}
        />
      ))}
    </div>
  );
};

export default CourseList; 