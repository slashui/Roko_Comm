"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import dayjs from 'dayjs';
import Confetti from 'react-confetti';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import FrontNav from '@/components/FrontNav';
import FrontFooter from '@/components/FrontFooter';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const priceId = searchParams.get('price_id');
  const router = useRouter();
  const { data: session } = useSession();
  const [orderStatus, setOrderStatus] = useState('processing');
  const [orderData, setOrderData] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [userExists, setUserExists] = useState(false);

  // ... 其他代码保持不变 ...

// 页面加载完成检测
useEffect(() => {
  setIsPageLoaded(true);
}, []);

// 处理支付成功逻辑
useEffect(() => {
  if (!isPageLoaded || !sessionId) return;

  const processCheckout = async () => {
    try {
      // 调用新的checkout处理API
      const response = await axios.post('/api/checkout/process', {
        sessionId: sessionId
      });

      const { purchase, course, userStatus, customerEmail, purchaseEmail } = response.data;

      // 设置订单数据
      setOrderData({
        email: customerEmail || purchaseEmail || purchase.customerEmail,
        productName: course.title,
        productPrice: purchase.amount,
        currency: purchase.currency,
        course: course,
        purchase: purchase
      });

      // 根据用户状态设置页面状态
      switch (userStatus) {
        case 'logged_in_completed':
        case 'claimed_and_completed':
          setOrderStatus('success');
          break;
        case 'logged_in_different_email':
          setOrderStatus('email_mismatch');
          break;
        case 'needs_claim':
          // 检查邮箱是否已注册
          try {
            const emailCheckResponse = await axios.post('/api/user/check-email', {
              email: customerEmail || purchase.customerEmail
            });
            setUserExists(emailCheckResponse.data.exists);
            setOrderStatus(emailCheckResponse.data.exists ? 'login' : 'register');
          } catch (error) {
            console.error('检查用户邮箱失败:', error);
            setUserExists(false);
            setOrderStatus('register');
          }
          break;
        default:
          setOrderStatus('processing');
      }
    } catch (error) {
      console.error('处理支付失败:', error);
      setOrderStatus('error');
    }
  };

  processCheckout();
}, [isPageLoaded, sessionId, priceId, session]);

// 处理用户登录状态变化
useEffect(() => {
  if (session?.user && orderData && ['login', 'register'].includes(orderStatus)) {
    const claimPurchases = async () => {
      try {
        const response = await axios.post('/api/user/claim-purchase', {
          email: orderData.email
        });

        if (response.data.success && response.data.claimedCourses.length > 0) {
          setOrderStatus('success');
        }
      } catch (error) {
        console.error('认领购买记录失败:', error);
      }
    };

    claimPurchases();
  }
}, [session, orderData, orderStatus]);

// ... 其他代码保持不变 ...

  // 渲染不同状态的UI
  const renderStatusContent = () => {
    if (!orderData) return null;
    
    switch (orderStatus) {
      case 'success':
        return (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">购买成功！</h2>
            <p className="mb-4">感谢您购买《{orderData.productName}》课程，您现在可以开始学习了。</p>
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              进入控制面板
            </button>
          </div>
        );
      
      case 'login':
        return (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">请登录您的账户</h2>
            <p className="mb-4">我们发现您已经注册了账户（{orderData.email}），请登录以激活您的课程权限。</p>
            <Link 
              href={`/login?email=${encodeURIComponent(orderData.email)}&callbackUrl=/dashboard`}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 inline-block"
            >
              立即登录
            </Link>
          </div>
        );
      
      case 'register':
        return (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">创建您的账户</h2>
            <p className="mb-4">请使用邮箱 {orderData.email} 创建账户以激活您的课程权限。</p>
            <Link 
              href={`/z?email=${encodeURIComponent(orderData.email)}`}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 inline-block"
            >
              立即注册
            </Link>
          </div>
        );
      
      case 'email_mismatch':
        return (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">邮箱不匹配</h2>
            <p className="mb-4">您当前登录的账户邮箱与购买时使用的邮箱不一致。</p>
            <p className="mb-4">购买邮箱：{orderData.email}</p>
            <p className="mb-4">请使用正确的邮箱登录，或联系客服处理。</p>
            <div className="space-x-4">
              <Link 
                href={`/login?email=${encodeURIComponent(orderData.email)}`}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 inline-block"
              >
                使用购买邮箱登录
              </Link>
              <button 
                onClick={() => router.push('/contact')}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
              >
                联系客服
              </button>
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">处理失败</h2>
            <p className="mb-4">处理您的购买时出现了问题，请联系客服。</p>
            <button 
              onClick={() => router.push('/contact')}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              联系客服
            </button>
          </div>
        );
      
      default:
        return (
          <div className="mt-8 text-center">
            <p className="mb-4">正在处理您的订单...</p>
          </div>
        );
    }
  };

  return (
    <div className=' bg-[#d6cbff] flex flex-col items-center justify-center'>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={3000}
        recycle={false}
        opacity={1}
        gravity={0.8}
        duration={10000}
      />

      <FrontNav />

      <div className="w-full max-w-2xl mx-auto space-y-4 mt-16">
    {/* 成功图标和标题 */}
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-2">支付成功</h1>
      <p className="text-gray-600">恭喜你，即将踏上AI编程之旅，10X你的效率！</p>
    </div>

    {/* 订单信息卡片 */}
    <div className="bg-[#FFF8F3] rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">📖</span>
        </div>
        <span className="text-lg font-medium">{orderData?.productName || '洛克AI实战营'}</span>
        
        
  {console.log('渲染时的订单数据:', orderData)} {/* 添加调试日志 */}
  {orderData && (
    <div className="ml-auto font-bold text-lg">
      ¥{orderData.productPrice || '加载中...'}
    </div>
  )}
      </div>

      <div className="flex flex-row">
       <div className='w-2/3'>
              
          <p className="text-gray-700 text-lg mb-4 pr-4 pt-4 gap-y-4">
            您已经成功购买了本课程！<br />
            {userExists ? (
              <>请您用付费时使用的邮箱 <strong>{orderData?.email}</strong> 登录进行学习。</>
            ) : (
              <>您只需要完成注册，就可以进入课程了。</>
            )}<br />
            如果您在注册中有任何疑问都请通过右侧的二维码联系我本人解决。
          </p>
          
          <div className="mt-6 flex gap-4 ">
            {session?.user ? (
              <a 
                href="/dashboard"
                className="bg-[#845eee] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 inline-block"
              >
                去主页学习
              </a>
            ) : userExists ? (
              <a 
                href={`/cn/login?email=${encodeURIComponent(orderData?.email || '')}&callbackUrl=/dashboard`}
                className="bg-[#845eee] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 inline-block"
              >
                去登录
              </a>
            ) : (
              <a 
                href={`/cn/z?email=${encodeURIComponent(orderData?.email || '')}&role=${orderData?.userRole || 'PRIME'}`}
                className="bg-[#845eee] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 inline-block"
              >
                创建新账户
              </a>
            )}
      </div>
       </div>
       <div className='w-1/3'>
        <img src='/slashuiwc.png' />
       </div>


        
      </div>
    </div>

    {/* 操作按钮 */}
    
    
  </div>
      <FrontFooter />
      <div className='max-w-6xl w-full min-w-96 h-screen hidden'>
        <div className='py-8'><img src='/pic/logo.png' alt="Logo" /></div>
        <div className='w-full flex justify-center'><img src='/pic/success.png' alt="Success" /></div>
        <h1 className='md:text-5xl text-4xl py-5 font-inter font-bold text-primary flex justify-center'>Hey, let's start Build something.</h1>
        
        {orderData && (
          <div className="mt-4 text-center">
            <p className="text-xl">
              产品: {orderData.productName} | 金额: 
            </p>
          </div>
        )}
        
        {renderStatusContent()}
        
        {/* 添加一个始终可见的注册和登录按钮区域 */}
        <div className="mt-12 text-center">
          <h3 className="text-xl mb-4">快速操作</h3>
          <div className="flex justify-center gap-4">
            <Link 
              href={`/z?email=${encodeURIComponent(orderData?.email || '')}&role=${orderData?.userRole || 'PRIME'}`}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 inline-block"
            >
              创建新账户
            </Link>
            <Link 
              href={`/login?email=${encodeURIComponent(orderData?.email || '')}&callbackUrl=/dashboard`}
              className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-gray-100 inline-block"
            >
              登录账户
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}