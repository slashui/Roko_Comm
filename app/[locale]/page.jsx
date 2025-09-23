"use client"

import { useTranslations } from "next-intl";
import FrontNav from "@/components/FrontNav";
import { Sparkles, Users, BookOpen, MessageCircle, TrendingUp, Target, ArrowRight, Star, Brain, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from 'next/navigation';

export default function Home() {
  const t = useTranslations("Index");
  const [stripeProducts, setStripeProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'cn';

  const fallbackCourses = [
    {
      title: "一人公司的必要知识储备",
      price: "¥99",
      description: "适合独立创业者的基础知识体系",
      features: ["创业思维培养", "商业模式设计", "运营管理技巧", "财务基础知识"],
      color: "from-purple-400 to-pink-400"
    },
    {
      title: "AI教程",
      price: "¥199", 
      description: "全面的AI技术学习路径",
      features: ["AI工具使用", "提示词编写", "模型调用技巧", "实战项目"],
      color: "from-blue-400 to-purple-400",
      popular: true
    },
    {
      title: "全能套餐",
      price: "¥999",
      description: "AI项目+创业知识+源码+自媒体课程",
      features: ["所有课程内容", "案例代码", "自媒体运营", "社群终身会员", "1对1指导"],
      color: "from-orange-400 to-red-400"
    }
  ];

  useEffect(() => {
    const fetchStripeProducts = async () => {
      try {
        const response = await axios.get('/api/stripe/getproducts');
        if (response.data && response.data.length > 0) {
          const productsWithMetadata = response.data.map((price, index) => ({
            id: price.id,
            title: price.product.name || fallbackCourses[index]?.title || `课程 ${index + 1}`,
            price: `¥${(price.unit_amount / 100).toFixed(0)}`,
            description: price.product.description || fallbackCourses[index]?.description || "课程描述",
            features: fallbackCourses[index]?.features || ["课程内容", "学习资料", "在线支持"],
            color: fallbackCourses[index]?.color || "from-purple-400 to-pink-400",
            popular: index === 1,
            stripeData: price
          }));
          setStripeProducts(productsWithMetadata);
        }
      } catch (error) {
        console.error('获取Stripe产品失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStripeProducts();
  }, []);

  const courses = stripeProducts.length > 0 ? stripeProducts : fallbackCourses;

  const communityFeatures = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "技术分享与教程",
      description: "AI工具使用、提示词编写、实操案例分享",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "行业资讯与趋势", 
      description: "最新AI动态、大模型更新、商业新闻",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-100"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "实用案例分享",
      description: "AI应用案例、效率提升方法、踩坑经验",
      bgColor: "bg-gradient-to-br from-orange-50 to-yellow-100"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "讨论与交流",
      description: "技术答疑、心得交流、AI伦理探讨",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "商业机会",
      description: "创业项目、变现模式、合作资源对接",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <FrontNav />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-orange-600/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-orange-500 p-4 rounded-full">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI探索者
              <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent"> 社群</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              专业的AI学习与交流平台，汇聚前沿技术分享、实战案例解析和商业机会探讨
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2" />
                立即加入社群
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-purple-500 hover:text-purple-600 transition-all duration-300">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Offerings */}
      <section className="py-20 bg-white" id="courses">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">精选课程</h2>
            <p className="text-xl text-gray-600">购买任意课程即可加入专属社群</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {courses.map((course, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 ${course.popular ? 'border-orange-400 transform scale-105' : 'border-gray-200'}`}>
                {course.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-bl-2xl">
                    <Star className="w-4 h-4 inline mr-1" />
                    热门
                  </div>
                )}
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-6">{course.price}</div>
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-600">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.color} mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={async (e) => {
                      if (course.stripeData) {
                        e.preventDefault();
                        try {
                          e.target.disabled = true;
                          e.target.textContent = '处理中...';
                          
                          const {data} = await axios.post('/api/stripe/payment', {
                            priceId: course.stripeData.id
                          });
                          
                          if (data) {
                            window.location.assign(data);
                          }
                        } catch (error) {
                          console.error('Payment error:', error);
                          e.target.disabled = false;
                          e.target.textContent = '立即购买';
                          
                          if (error.response?.status === 401) {
                            alert('请先登录后再进行购买');
                            window.location.href = `/${currentLocale}/login`;
                          } else {
                            alert('支付请求失败: ' + (error.response?.data?.error || error.message));
                          }
                        }
                      }
                    }}
                    className={`w-full bg-gradient-to-r ${course.color} text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50`}
                  >
                    立即购买
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">社群提供什么</h2>
            <p className="text-xl text-gray-600">五大核心板块，助力你的AI探索之旅</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {communityFeatures.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105`}>
                <div className="text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-orange-500">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">开始你的AI探索之旅</h2>
            <p className="text-xl text-purple-100 mb-8">加入我们的社群，与志同道合的AI探索者一起成长</p>
            <button className="bg-white text-purple-600 px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <Users className="w-6 h-6 inline mr-2" />
              立即加入社群
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}