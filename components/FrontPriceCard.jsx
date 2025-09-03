import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useTranslations } from "next-intl";


/**
 * Landing Page Price Card Component
 * 
 * Single pricing card displaying product details and Stripe payment integration.
 */


const PricingCard = ({price,bgColor, originalPrice}) => {
  const [theme, setTheme] = useState('light');
  const t = useTranslations("Landing");

  useEffect(() => {
    const htmlClass = document.documentElement.className;
    setTheme(htmlClass);
  }, []);



    const handleClick = async (e) => {
      e.preventDefault();
      const {data} = await axios.post('/api/stripe/payment', 
      {
        priceId: price.id
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
      );
      window.location.assign(data)
    }
   

  return (
    <div className="p-6 rounded-2xl bg-white border-4 border-black shadow-[6px_6px_0_#333] hover:shadow-[8px_8px_0_#333] hover:-translate-y-1 transition-transform duration-300 ">
      <p className='text-black h-[40px]  text-2xl'>{price.product.name || 'SaaS + AI Tools Kit'}</p>
      <p className='text-6xl font-inter font-bold  text-[#435df6]  mt-2' >{(price.unit_amount /100).toLocaleString('zh-CN',{
          style: 'currency',
          currency: 'CNY',
          minimumFractionDigits: 0, 
          maximumFractionDigits: 0, 
      })} 
        <span className='text-sm text-zinc-800'>元</span><span className='text-lg ml-4  text-zinc-800 line-through'>{originalPrice }</span>
      </p>
     
      <div className='h-[130px]'>

      <div className="mt-8 space-y-4">
                            <div className="flex items-center">
                              <div className="w-[20px] h-[20px] rounded-full bg-[#435df6] flex items-center justify-center text-white shadow-[4px_3px_0_rgba(0,0,0,0.25)]">
                                <span className="text-sm text-white">&gt;</span>
                              </div>
                              <h4 className="text-lg font-bold text-zinc-800 ml-4">终身学习权限，持续更新内容</h4>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="w-[20px] h-[20px] rounded-full bg-[#435df6] flex items-center justify-center text-white shadow-[4px_3px_0_rgba(0,0,0,0.25)]">
                              <span className="text-sm text-white">&gt;</span>
                              </div><h4 className="text-lg font-bold text-zinc-800 ml-4">AI助教实时互动答疑解惑</h4>
                              
                            </div>
                            
                            <div className="flex items-center">
                              <div className="w-[20px] h-[20px] rounded-full bg-[#435df6] flex items-center justify-center text-white shadow-[4px_3px_0_rgba(0,0,0,0.25)]">
                              <span className="text-sm text-white">&gt;</span>
                              </div>                                <h4 className="text-lg font-bold text-zinc-800 ml-4">导师一对一指导，定制学习路径</h4>

                             
                            </div>
                          </div> 

      </div>
      <button onClick={handleClick} className='bg-[#435df6]  w-full text-white py-4 mb-6 mt-6 rounded-full hover:bg-black/80 font-bold'>立即购买</button>
    </div>
      
      
  )
}

export default PricingCard