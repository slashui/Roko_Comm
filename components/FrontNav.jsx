"use client"

import React from 'react';

const FrontNav = () => {
  return (
    <nav className="pt-4">
        <div className="container mx-auto px-5">
            <div className="flex items-center justify-between h-16">
                
                <div className="flex items-center">
                    <a href="/" className="text-2xl font-bold text-primary"><img src="/logo.png" className="w-[200px]" /></a>
                </div>
                
               
                <div className="hidden md:flex items-center space-x-8 bg-gradient-to-r from-pink-100 to-purple-100 px-10 py-4 rounded-full shadow-md">
                    <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">首页</a>
                    <a href="#price" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">课程大纲</a>
                    <a href="#faq" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">常见问题</a>
                    {/* <a href="https://ocnswg29s4bf.feishu.cn/wiki/GV8ZwISk3iTOB9kHlDucIYwnnxd" target="_blank" className="text-dark hover:text-[#8B5CF6] transition-colors">行业资料</a> */}
                    {/* <a href="#" className="text-dark hover:text-[#8B5CF6] transition-colors">资源下载</a> */}
                </div>
                
               
                <div>
                    <a href="/cn/dashboard" className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg">进入学习</a>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default FrontNav;