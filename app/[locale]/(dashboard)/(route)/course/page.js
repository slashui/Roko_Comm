import Image from 'next/image'
import { useTranslations } from "next-intl";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default function Home({ params }) {
  const t = useTranslations("Dashboard");
  const session = getServerSession(authOptions);
  const lang = params.locale;
  
  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">欢迎来到 AI 编程课程</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">课程概览</h2>
            <p className="text-gray-600">
              在这个课程中，你将学习如何使用现代 AI 工具来提升编程效率。
              请从左侧菜单选择你想要学习的章节开始学习。
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">学习进度</h3>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-500 rounded" style={{width: '0%'}}></div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">最近学习</h3>
              <p className="text-sm text-gray-500">暂无学习记录</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}