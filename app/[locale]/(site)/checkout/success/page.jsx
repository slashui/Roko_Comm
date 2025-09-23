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

  // ... 其他代码保持不变 ...

// 页面加载完成检测
useEffect(() => {
  setIsPageLoaded(true);
}, []);

// 订单数据获取
useEffect(() => {
  if (!isPageLoaded || !sessionId) return;

  const fetchSessionInfo = async () => {
    try {
      const response = await axios.get(`/api/stripe/session?session_id=${sessionId}`);
      const sessionData = response.data;
      console.log('获取到的完整 sessionData:', sessionData);
      
      if (sessionData.customer_details) {
        const productPrice = sessionData.amount_total ? sessionData.amount_total / 100 : 99;
        
        // 从line_items中获取正确的产品名称
        let productName = '洛克AI编程实战课'; // 默认值
        if (sessionData.line_items && sessionData.line_items.data && sessionData.line_items.data.length > 0) {
          const lineItem = sessionData.line_items.data[0];
          if (lineItem.price && lineItem.price.product) {
            // 如果product是对象，直接获取name
            if (typeof lineItem.price.product === 'object') {
              productName = lineItem.price.product.name || productName;
            }
          }
          // 如果没有获取到产品名称，尝试从description获取
          if (productName === '洛克AI编程实战课' && lineItem.description) {
            productName = lineItem.description;
          }
        }
        // 最后尝试从session的description获取
        if (productName === '洛克AI编程实战课' && sessionData.description) {
          productName = sessionData.description;
        }
        
        const email = sessionData.customer_details?.email;
        const name = sessionData.customer_details?.name;
        
        // 确定用户角色
        const userRole = productPrice === 79 ? 'PRIME' : productPrice === 99 ? 'VIP' : 'FREE';
        
        // 设置订单数据
        setOrderData({
          email,
          name,
          productName,
          productPrice,
          userRole
        });

        // 创建订单记录
        try {
          await axios.post('/api/orders', {
            email: email || '',
            priceid: priceId,
            checkout_session_id: sessionId,
            name: name || '',
            productname: productName,
            amount: productPrice,
            addtime: dayjs().format('YYYY-MM-DD HH:mm:ss')
          });

          // 处理用户角色
          if (session?.user) {
            try {
              await axios.post('/api/user/update-role', {
                email: session.user.email,
                role: userRole
              });
              setOrderStatus('success');
            } catch (error) {
              console.error('更新用户角色失败:', error);
              setOrderStatus('success');
            }
          } else {
            try {
              const userCheckResponse = await axios.post('/api/user/check-email', { email });
              setOrderStatus(userCheckResponse.data.exists ? 'login' : 'register');
            } catch (error) {
              console.error('检查用户邮箱失败:', error);
              setOrderStatus('register');
            }
          }
        } catch (orderError) {
          if (orderError.response?.status === 409 || 
              orderError.response?.data?.code === 'DUPLICATE_ORDER' ||
              orderError.response?.data?.message?.includes('已经处理过')) {
            console.log('订单已经处理过，继续处理用户角色');
            
            if (session?.user) {
              try {
                await axios.post('/api/user/update-role', {
                  email: session.user.email,
                  role: userRole
                });
                setOrderStatus('success');
              } catch (error) {
                console.error('更新用户角色失败:', error);
                setOrderStatus('success');
              }
            } else {
              try {
                const userCheckResponse = await axios.post('/api/user/check-email', { email });
                setOrderStatus(userCheckResponse.data.exists ? 'login' : 'register');
              } catch (error) {
                console.error('检查用户邮箱失败:', error);
                setOrderStatus('register');
              }
            }
          } else {
            console.error('创建订单失败:', orderError);
          }
        }
      }
    } catch (error) {
      console.error('获取 Session 信息失败:', error);
    }
  };

  fetchSessionInfo();
}, [isPageLoaded, sessionId, priceId, session]);

// ... 其他代码保持不变 ...

  // 渲染不同状态的UI
  const renderStatusContent = () => {
    if (!orderData) return null;
    
    switch (orderStatus) {
      case 'success':
        return (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">您已成功升级为 {orderData.userRole} 会员！</h2>
            <p className="mb-4">感谢您的购买，您现在可以享受更多功能。</p>
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
            <p className="mb-4">我们发现您已经注册了账户，请登录以激活您的 {orderData.userRole} 会员权限。</p>
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
            <p className="mb-4">请创建一个账户以激活您的 {orderData.userRole} 会员权限。</p>
            <Link 
              href={`/z?email=${encodeURIComponent(orderData.email)}&role=${orderData.userRole}`}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 inline-block"
            >
              立即注册
            </Link>
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
            您已经成功购买了本课程！<br />您只需要完成注册，就可以进入课程了。<br />如果您在注册中有任何疑问都请通过右侧的二维码联系我本人解决。
          </p>
          
          <div className="mt-6 flex gap-4 ">
            {session?.user ? (
              <a 
                href="/dashboard"
                className="bg-[#845eee] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 inline-block"
              >
                去主页学习
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