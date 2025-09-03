'use client'
import Image from 'next/image'
import { useTranslations } from "next-intl";
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import CourseList from '@/components/CourseList';
import { useEffect, useState } from 'react'

export default function Home({ params }) {
  const t = useTranslations("Dashboard");
  const { data: session, status } = useSession();
  const lang = params.locale;
  const [authorizedCourses, setAuthorizedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAuthorizedCourses = async () => {
      console.log('=== Session Debug Info ===');
      console.log('Session status:', status);
      console.log('Full session object:', session);
      console.log('Session user:', session?.user);
      console.log('Session user id:', session?.user?.id);
      console.log('Session user email:', session?.user?.email);
      
      if (!session?.user?.id) {
        console.log('No user ID found in session, stopping course fetch');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching courses for userId:', session.user.id);
        const response = await fetch(`/api/user-courses?userId=${session.user.id}`);
        console.log('API response status:', response.status);
        
        if (response.ok) {
          const userCourses = await response.json();
          console.log('Received user courses:', userCourses);
          setAuthorizedCourses(userCourses);
        } else {
          const errorText = await response.text();
          console.error('API error response:', errorText);
          setError(`获取课程列表失败: ${response.status}`);
        }
      } catch (err) {
        console.error('Error loading authorized courses:', err);
        setError(`加载课程时出现错误: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (status !== 'loading') {
      loadAuthorizedCourses();
    }
  }, [session, status]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#F5F0F0", fontFamily: "Noto Sans CJK, sans-serif" }}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: "#F4C2C2" }}>
            🌸
          </div>
          <p style={{ color: "#6A6A6A" }}>课程加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#F5F0F0", fontFamily: "Noto Sans CJK, sans-serif" }}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: "#F4C2C2" }}>
            ❌
          </div>
          <p style={{ color: "#6A6A6A" }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#F5F0F0", fontFamily: "Noto Sans CJK, sans-serif" }}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: "#F4C2C2" }}>
            🔒
          </div>
          <p style={{ color: "#6A6A6A" }}>请先登录查看您的课程</p>
        </div>
      </div>
    );
  }
  
  return (
    <main className="flex-1 p-4 lg:p-8" style={{ backgroundColor: "#F5F0F0", fontFamily: "Noto Sans CJK, sans-serif" }}>
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-8 py-8 md:py-12 my-6 md:my-8 rounded-3xl flex items-center justify-center relative overflow-hidden" 
               style={{ backgroundColor: "#7BA05B" }}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-8 right-8 w-16 h-16 rounded-full opacity-30" style={{ backgroundColor: "#F4C2C2" }}></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full opacity-40" style={{ backgroundColor: "#C8D4C0" }}></div>
          <div className="absolute top-1/2 left-1/4 w-6 h-6 rounded-full opacity-50" style={{ backgroundColor: "#D4AF37" }}></div>
        </div>
        
        <div className="w-full mx-auto text-white py-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left column - Title section */}
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                我的课程中心
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                欢迎回来！这里是您已授权的课程列表，
                继续您的学习之旅，掌握新的技能。
              </p>
            </div>

            {/* Right column - User Info */}
            <div className="md:w-1/3 w-full">
              <div className="rounded-xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                <h2 className="text-xl font-bold mb-3">用户信息</h2>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="opacity-90">当前用户:</span>
                    <div className="font-semibold mt-1 text-white bg-white/10 px-3 py-2 rounded-lg">
                      {session?.user?.email || 'user@example.com'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: `/${lang}/login` })}
                  className="w-full mt-4 px-4 py-2 bg-white rounded-full font-medium hover:opacity-90 transition-opacity"
                  style={{ color: "#7BA05B" }}
                >
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authorized Courses */}
      <div className="space-y-6 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#4A4A4A" }}>
            我的授权课程
          </h2>
          <p className="text-lg" style={{ color: "#6A6A6A" }}>
            您已获得以下课程的学习权限，开始您的学习之旅吧
          </p>
        </div>

        {authorizedCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-6" 
                 style={{ backgroundColor: "#F4C2C2" }}>
              📚
            </div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: "#4A4A4A" }}>
              暂无授权课程
            </h3>
            <p className="text-lg mb-6" style={{ color: "#6A6A6A" }}>
              您还没有被授权访问任何课程，请联系管理员获取课程权限。
            </p>
          </div>
        ) : (
          authorizedCourses.map((userCourse, index) => (
            <div 
              key={userCourse.id}
              className="flex flex-col lg:flex-row gap-6 p-6 md:p-8 rounded-3xl transition-all duration-300 hover:shadow-lg bg-white shadow-md"
            >
              {/* 左侧课程信息 */}
              <div className="lg:w-1/3">
                <div className="p-6 rounded-2xl h-full flex flex-col justify-center" 
                     style={{ backgroundColor: index % 3 === 0 ? "#7BA05B" : index % 3 === 1 ? "#F4C2C2" : "#D4AF37" }}>
                  <div className="space-y-4 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl font-bold" 
                         style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}>
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {userCourse.course.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {userCourse.course.description || '开始您的学习之旅'}
                    </p>
                    <div className="text-xs text-white/70">
                      授权时间: {new Date(userCourse.grantedAt).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧课程操作 */}
              <div className="lg:w-2/3">
                <div className="p-4 flex flex-col justify-center h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold" style={{ color: "#4A4A4A" }}>
                        课程详情
                      </h4>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" 
                            style={{ backgroundColor: "#E8F5E8", color: "#2D5A2D" }}>
                        已授权
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">课程分类:</span>
                        <span className="ml-2 font-medium">{userCourse.course.category || '通用课程'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">课程状态:</span>
                        <span className="ml-2 font-medium">
                          {userCourse.course.status === 'PUBLISHED' ? '已发布' : 
                           userCourse.course.status === 'DRAFT' ? '草稿' : '已归档'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Link 
                        href={`/${lang}/course/${userCourse.course.courseId}`}
                        className="flex-1 px-4 py-2 text-center rounded-full font-medium transition-colors"
                        style={{ backgroundColor: "#7BA05B", color: "white" }}
                      >
                        开始学习
                      </Link>
                      <button 
                        className="px-4 py-2 rounded-full font-medium transition-colors border"
                        style={{ borderColor: "#7BA05B", color: "#7BA05B" }}
                        onClick={() => {
                          // 可以添加查看课程详情的功能
                          alert('课程详情功能开发中...');
                        }}
                      >
                        课程详情
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Progress Summary */}
      <div className="mt-12 p-8 rounded-3xl text-center" style={{ backgroundColor: "#F8F5F0" }}>
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4" style={{ color: "#4A4A4A" }}>
            您的学习之旅
          </h3>
          <p className="text-lg mb-6" style={{ color: "#6A6A6A" }}>
            跟随传统技艺的脚步，在每一次练习中感受和果子制作的魅力
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-3" 
                   style={{ backgroundColor: "#7BA05B" }}>
                🌸
              </div>
              <h4 className="font-semibold mb-2" style={{ color: "#4A4A4A" }}>基础技法</h4>
              <p className="text-sm" style={{ color: "#8A8A8A" }}>掌握基本制作方法</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-3" 
                   style={{ backgroundColor: "#F4C2C2" }}>
                🍡
              </div>
              <h4 className="font-semibold mb-2" style={{ color: "#4A4A4A" }}>进阶造型</h4>
              <p className="text-sm" style={{ color: "#8A8A8A" }}>学习复杂造型技巧</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-3" 
                   style={{ backgroundColor: "#D4AF37" }}>
                ✨
              </div>
              <h4 className="font-semibold mb-2" style={{ color: "#4A4A4A" }}>创意展现</h4>
              <p className="text-sm" style={{ color: "#8A8A8A" }}>独立创作精美作品</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}