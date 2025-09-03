import React from 'react'
import { useLocale } from "next-intl";


/**
 * Footer Component
 * 
 * Displays site navigation, legal links and copyright information in a responsive layout.
 */


const FrontFooter = () => {
    const locale = useLocale();
  return (
    <>
<hr className="mt-24" />
    <section className="container mx-auto px-5 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            {/* 左侧版权信息 */}
            <div className="text-gray-600">
                <p>© 2024 AI编程实战课. All rights reserved.</p>
            </div>
            
            {/* 右侧社交媒体图标 */}
          
            <div className="flex items-center gap-6">
                <a href="https://www.youtube.com/@likeGPT" className="hover:-translate-y-1 transition-transform duration-200">
                    <img src="/youtube.svg" alt="抖音" className="w-6 h-6" />
                </a>
                <a href="#" className="hover:-translate-y-1 transition-transform duration-200">
                    <img src="/bilibili.svg" alt="哔哩哔哩" className="w-6 h-6" />
                </a>
                <a href="#" className="hover:-translate-y-1 transition-transform duration-200">
                    <img src="/tiktok.svg" alt="YouTube" className="w-6 h-6" />
                </a>
                <div className="relative group">
                    <img src="/wechat.svg" alt="微信" className="w-6 h-6 cursor-pointer hover:-translate-y-1 transition-transform duration-200" />
                    <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
                            <img src="/qrcode.jpg" alt="微信二维码" className="w-32 h-32" />
                            <p className="text-xs text-center mt-1 text-gray-600">扫码添加微信</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    </>
  )
}

 

export default FrontFooter