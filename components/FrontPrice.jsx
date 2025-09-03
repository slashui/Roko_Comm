'use client'
import axios from "axios";
import Stripe from 'stripe'
import { useState, useEffect } from "react";
import FrontPriceCard from "./FrontPriceCard";
// import { loadStripe } from '@stripe/stripe-js';
import FrontGift from "./FrontGift";
import { useTranslations } from "next-intl";
/**
 * Price Section Component
 * 
 * Landing page pricing section featuring single price display with 
 * auto-scrolling user testimonials on the left.
 */



const Home = () => {
  const [prices, setPrices] = useState([]);
  const t = useTranslations("Landing");

  const priceCards = [
    {
      id: 1,
      product: { name: "基础版" },
      unit_amount: 19900,
      bgColor: 'bg-gradient-to-r from-pink-400 to-purple-400',
      originalPrice: '299'
    },
    {
      id: 2,
      product: { name: "高级版" },
      unit_amount: 59900,
      bgColor: 'bg-gradient-to-r from-purple-400 to-pink-400',
      originalPrice: '899'
    }
  ];
  console.log('Price Cards:', priceCards);


  useEffect(() => 
  {
    fetchPrices()
  },[])
  
 
  const fetchPrices = async () => {
    try {
      const response = await axios.get('/api/stripe/getproducts')

      if (response && response.data) {
        // 对价格进行排序，让 199 显示在前面
        const sortedPrices = {
          ...response.data,
          prices: response.data.prices?.sort((a, b) => a.unit_amount - b.unit_amount)
        };
        setPrices(sortedPrices);
      } else {
        console.error("Missing data in response");
      }

    } catch (error) {
      console.error("Error fetching prices:", error)
    }
  }
  console.log("Current prices state:", prices);




  return (
   
<div className="w-full flex dark:text-white p-6 flex-col mt-16 bg-gradient-to-br from-pink-50 to-purple-50"  id="price">
  <h1 className='lg:text-5xl md:text-4xl mb-2 text-3xl mx-auto flex font-inter '>{t("PriceTitle")}</h1>
  <FrontGift />
  <div className="max-w-6xl w-full flex flex-col sm:flex-row md:mt-14 mt-6">
    <div className="w-full sm:w-1/2 pt-10 order-2 sm:order-1">
      <img src="/pic/blackfriday.png" />
      <div className="carousel-container h-[600px] w-full max-w-sm mx-auto overflow-hidden relative hidden">
        <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-white dark:from-black to-transparent z-10"></div>
          <div className="carousel-track">

            <div class="max-w-md mx-auto bg-[#1f1f1f] border border-[#ffffff]/20 rounded-xl overflow-hidden shadow-lg p-6 mb-4">  
              <div class="flex text-indigo-500 dark:text-indigo-400 mb-4">
                <img src="/icon/icon_star.svg" width="20" height="20" />
                <img src="/icon/icon_star.svg" width="20" height="20" />
                <img src="/icon/icon_star.svg" width="20" height="20" />
                <img src="/icon/icon_star.svg" width="20" height="20" />
                <img src="/icon/icon_star.svg" width="20" height="20" />
              </div>
              <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
                {t("recommand1")}  
              </p>
              <div class="flex items-center">
                <img class="w-10 h-10 rounded-full mr-4" src="/pic/avatar1.png" alt="Ethan Miller" />
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">Emily</p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">HuntFlow - AI Business Opportunity Finder </p>
                </div>
              </div>
            </div>
      
            <div class="max-w-md mx-auto bg-[#1f1f1f] border border-[#ffffff]/20 rounded-xl overflow-hidden shadow-lg p-6 mb-4">  <div class="flex text-indigo-500 dark:text-indigo-400 mb-4">
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
            </div>
            <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
              {t("recommand2")}   
            </p>
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4" src="/pic/avatar1.png" alt="Ethan Miller" />
              <div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">Michael</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">Paragram AI Social Media Image Platform</p>
              </div>
            </div>
          </div>
      
          <div class="max-w-md mx-auto bg-[#1f1f1f] border border-[#ffffff]/20 rounded-xl overflow-hidden shadow-lg p-6 mb-4">  
            <div class="flex text-indigo-500 dark:text-indigo-400 mb-4">
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
            </div>
            <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
              {t("recommand3")}   
            </p>
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4" src="/pic/avatar1.png" alt="Ethan Miller" />
              <div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">James</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">DramatiQ - AI Short-Form Video Platform</p>
              </div>
            </div>
          </div>
      
          <div class="max-w-md mx-auto bg-[#1f1f1f] border border-[#ffffff]/20 rounded-xl overflow-hidden shadow-lg p-6 mb-4">  
            <div class="flex text-indigo-500 dark:text-indigo-400 mb-4">
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
            </div>
            <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
            {t("recommand4")} </p>
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4" src="/pic/avatar1.png" alt="Ethan Miller" />
              <div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">Alex</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">Buddha Talks - AI Religious Dialogue Application</p>
              </div>
            </div>
          </div>
      
          <div class="max-w-md mx-auto bg-[#1f1f1f] border border-[#ffffff]/20 rounded-xl overflow-hidden shadow-lg p-6 mb-4">
            <div class="flex text-indigo-500 dark:text-indigo-400 mb-4">
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
            </div>
            <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
            {t("recommand5")} </p>  <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4" src="/pic/avatar1.png" alt="Ethan Miller" />
              <div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">Sarah</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">WebCraft - WebTemplate</p>
              </div>
            </div>
          </div>



          <div class="max-w-md mx-auto bg-[#1f1f1f] border border-[#ffffff]/20 rounded-xl overflow-hidden shadow-lg p-6 mb-4">  
            <div class="flex text-indigo-500 dark:text-indigo-400 mb-4">
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
              <img src="/icon/icon_star.svg" width="20" height="20" />
            </div>
            <p class="mb-4 text-sm text-gray-700 dark:text-gray-300">
            {t("recommand6")}   </p>
            <div class="flex items-center">
              <img class="w-10 h-10 rounded-full mr-4" src="/pic/avatar1.png" alt="Ethan Miller" />
              <div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white">Chen</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">AI Agent Lab - AI Community</p>
              </div>
            </div>
          </div>
          <div className="h-[2px]"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-white dark:from-black to-transparent z-10"></div>
      </div>
    </div>
    <div className="max-w-6xl w-full flex flex-col sm:flex-row md:mt-14 mt-6">
    <div className="w-full sm:w-1/2 pt-10 order-1">  {/* 修改这里的 order-2 为 order-1 */}
      <img src="/pic/blackfriday.png" />
      // ... existing code ...
    </div>
    <div className="w-full sm:w-1/2 pt-10 order-2">  {/* 修改这里的 order-1 为 order-2 */}
    
// 在 map 函数中添加日志
{priceCards.map((price, index) => (
        <FrontPriceCard 
          key={price.id}
          price={price}
          bgColor={price.bgColor}
          originalPrice={price.originalPrice}
        />
      ))}
    </div>
</div>
</div>
</div>
  );
}

export default Home;