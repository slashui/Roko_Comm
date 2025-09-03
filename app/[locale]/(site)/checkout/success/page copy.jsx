"use client"
import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import dayjs from 'dayjs';
import Confetti from 'react-confetti'

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const priceId = searchParams.get('price_id');

  React.useEffect(() => {
    const fetchSessionInfo = async () => {
      try {
        const response = await axios.get(`/api/stripe/session?session_id=${sessionId}`);
        const sessionData = response.data;
        
        if (sessionData.customer_details) {
          const email = sessionData.customer_details.email;
          const name = sessionData.customer_details.name;
          
          // 获取产品信息
          const lineItems = sessionData.line_items?.data || [];
          const productName = lineItems[0]?.description || '未知产品';
          const productPrice = lineItems[0]?.amount_total / 100 || 0;
          
          console.log('购买产品:', productName);
          console.log('支付金额:', `¥${productPrice}`);
          
          try {
            console.log('正在发送订单数据:', {
              email: email || '',
              priceid: priceId,
              checkout_session_id: sessionId,
              name: name || '',
              productname: productName,
              amount: productPrice,
              addtime: dayjs().format('YYYY-MM-DD HH:mm:ss')
            });
            
            const orderResponse = await axios.post('/api/orders', {
              email: email || '',
              priceid: priceId,
              checkout_session_id: sessionId,
              name: name || '',
              productname: productName,
              amount: productPrice,
              addtime: dayjs().format('YYYY-MM-DD HH:mm:ss')
            });
            console.log('订单创建成功:', orderResponse.data);
            
            // 显示订单信息
            // alert(`订单信息：
            //   产品：${productName}
            //   金额：${productPrice}
            //   用户：${name || '未提供'}
            //   邮箱：${email || '未提供'}
            // `);
          } catch (orderError) {
            console.error('创建订单失败:', orderError);
            
            // 显示详细错误信息
            if (orderError.response) {
              console.error('错误状态码:', orderError.response.status);
              console.error('错误详情:', orderError.response.data);
              // alert(`创建订单失败: ${JSON.stringify(orderError.response.data)}`);
            } else {
              // alert(`创建订单失败: ${orderError.message}`);
            }
            
            if (orderError.response?.data?.message === 'This order has already been processed.') {
              console.log('订单已经处理过，无需重复处理');
            }
          }
        } else {
          alert('未能获取到用户详细信息');
        }
        
        console.log('完整的 Session 数据:', sessionData);
      } catch (error) {
        console.error('获取 Session 信息失败:', error);
        alert('获取用户信息失败: ' + (error.response?.data?.error || error.message));
      }
    };
  
    if (sessionId) {
      fetchSessionInfo();
    }
  }, [sessionId, priceId]);





  return (
    <div className='text-white md:px-0 px-6 w-full h-full flex items-center justify-center flex-col'>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={3000}
        recycle={false}
        opacity={1}
        gravity={0.8}
        duration={10000}
      />
      <div className='max-w-6xl w-full min-w-96 h-screen'>
        <div className='py-8'><img src='/pic/logo.png' /></div>
        <div className='w-full flex justify-center'><img src='/pic/success.png' /></div>
        <h1 className='md:text-5xl text-4xl py-5 font-inter font-bold text-primary flex justify-center'>Hey, let's start Build something.</h1>


        

      </div>
    

    </div>
  );
}