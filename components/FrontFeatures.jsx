"use client"
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from "next-themes";
import config from "@/config";
import { useTranslations } from "next-intl";

/**
 * Features Grid Component
 * 
 * Interactive grid layout showcasing key platform features with hover effects
 * and responsive animations.
 */



const FrontFeatures = () => {
const gridItems = [
    'Auth', 'Payment', 'Emails',
    'AI', '', 'AgentUI',
    'SEO', 'User', 'More',
  ];
  const [activeIndex, setActiveIndex] = useState(4);
  const [isHovering, setIsHovering] = useState(false);
  const t = useTranslations("Landing");

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    setActiveIndex(4);  
  };
  const { theme } = useTheme();


  const iconSrc = theme === 'system' ? '/icon/icon_right.svg' : '/icon/icon_right.svg';

  return (
    <div id='features' className="container flex flex-col justify-center p-6 mx-auto w-full max-w-7xl py-24 pt-48 text-black dark:text-white mt-4 md:mt-12">
        <div className='w-full'>
          <h1 className='lg:text-5xl md:text-4xl text-3xl justify-center mx-auto flex font-inter '>{t("Features-title")}</h1>
          <div className='w-full hidden md:flex justify-center'><img src='/pic/Vectorline.svg' />
            
          </div>
        </div>
        <div className="flex md:mt-16 mt-8 md:flex-row flex-col ">
          <div className="w-1/2 w-full">
          <div className='md:w-[500px] w-full grid grid-cols-3 gap-2 ml-auto mr-4' onMouseLeave={handleMouseLeave}>
              {gridItems.map((text, index) => (
                <div
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={`
                    aspect-square bg-white bg-[url('/box_bg.png')] 
                    border-4 
                    ${index === 4 && !isHovering ? 'breathe-animation' : 'border-gray-200 dark:border-zinc-800'} 
                    dark:hover:border-primary 
                    rounded-lg hover:border-zinc-300 cursor-pointer 
                    flex flex-col gap-2 justify-center items-center
                    transition-all duration-300 ease-in-out
                    hover:scale-105 hover:shadow-lg
                    ${activeIndex === index ? 'border-primary dark:border-primary scale-105' : ''}
                  `}
                >
                  <img src={`/icon/Index${index + 1}.svg`} alt={text} className=" md:max-w-full md:max-h-full " />
                  <span className='font-inter md:text-2xl text-lg font-thin'>{text}</span>
                </div>
              ))}
              </div>
            </div>
            <div className="md:pl-8 pl-0 w-1/2 w-full md:mt-0 mt-10">
              <div style={{ 
                  display: activeIndex === 0 ? 'block' : 'none',
                  opacity: activeIndex === 0 ? 1 : 0,
                  transform: `translateY(${activeIndex === 0 ? '0' : '20px'})`,
                }}
                className="transition-all duration-300 ease-in-out"
              >
                  <h2 className='font-inter text-5xl '>{t("Authname")}</h2>
                  <p className='dark:text-primary text-black  text-xl font-inter'>{t("Authsave")}</p>
                    <ul className='list-disc list-inside mt-8 space-y-4'>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Auth1")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Auth2")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Auth3")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Auth4")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Auth5")}</li>

                    </ul>
              </div>
              <div style={{ display: activeIndex === 1 ? 'block' : 'none' }}>
                <h2 className='font-inter text-5xl '>{t("Payments")}</h2>
                <p className='dark:text-primary text-black text-xl font-inter'>{t("Paymentssave")}</p>
                    <ul className='list-disc list-inside mt-8 space-y-4'>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Payments1")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Payments2")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Payments3")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Payments4")}</li>
                    </ul>
              </div>
              <div style={{ display: activeIndex === 2 ? 'block' : 'none' }}>
                <h2 className='font-inter text-5xl '>{t("Emails")}</h2>
                <p className='dark:text-primary text-black text-xl font-inter'>{t("Emailssave")}</p>
                    <ul className='list-disc list-inside mt-8 space-y-4'>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Emails1")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Emails2")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Emails3")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("Emails4")}</li>

                    </ul>
              </div>
              <div style={{ display: activeIndex === 3 ? 'block' : 'none' }}>
                <h2 className='font-inter text-5xl '>{t("AI")}</h2>
                <p className='dark:text-primary text-black text-xl font-inter'>{t("AIsave")}</p>
                    <ul className='list-disc list-inside mt-8 space-y-4'>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("AI1")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("AI2")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("AI3")}</li>

                    </ul>
              </div>
              <div style={{ display: activeIndex === 4 ? 'block' : 'none' }}>
                <h2 className='font-inter text-5xl '>{t("onedaybuild")}</h2>
                <p className='dark:text-primary text-black text-xl font-inter'>{t("onedaybuildsave")}</p>
                    <ul className='list-disc list-inside mt-8 space-y-4'>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("onedaybuild1")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("onedaybuild2")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("onedaybuild3")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("onedaybuild4")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("onedaybuild5")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("onedaybuild6")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("onedaybuild7")}</li>

                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("onedaybuild8")}</li>
                    </ul>
                  
              </div>
              <div style={{ display: activeIndex === 5 ? 'block' : 'none' }}>
                <h2 className='font-inter text-5xl '>{t("BuildUI")}</h2>
                <p className='dark:text-primary text-black text-xl font-inter'>{t("BuildUIsave")}</p>
                    <ul className='list-disc list-inside mt-8 space-y-4'>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("BuildUI1")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("BuildUI2")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("BuildUI3")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("BuildUI4")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("BuildUI5")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("BuildUI6")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("BuildUI7")}</li>
                    </ul>
              </div>
              <div style={{ display: activeIndex === 6 ? 'block' : 'none' }}>
                <h2 className='font-inter text-5xl '>{t("SEO")}</h2>
                  <p className='dark:text-primary text-blacktext-xl font-inter'>{t("SEOsave")}</p>
                    <ul className='list-disc list-inside mt-8 space-y-4'>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("SEO1")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("SEO2")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("SEO3")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("SEO4")}</li>

                    </ul>
              </div>
              <div style={{ display: activeIndex === 7 ? 'block' : 'none' }}>
                <h2 className='font-inter text-5xl '>{t("UserSystem")}</h2>
                <p className='dark:text-primary text-black text-xl font-inter'>{t("USsave")}</p>
                    <ul className='list-disc list-inside mt-8 space-y-4'>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("US01")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("US02")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("US03")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("US04")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("US05")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("US06")}</li>
                    </ul>
              </div>
              <div style={{ display: activeIndex === 8 ? 'block' : 'none' }}>
                <h2 className='font-inter text-5xl '>{t("More")}</h2>
                <p className='dark:text-primary text-black text-xl font-inter'>{t("Moresave")}</p>
                    <ul className='list-disc list-inside mt-8 space-y-4'>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("More01")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("More02")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("More03")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("More04")}</li>
                        <li className='flex flex-row gap-3 text-xl'><img src={iconSrc} width="20" height="20" />{t("More05")}</li>
                    </ul>
              </div>
            </div>
          </div>
      </div>
  )
}

export default FrontFeatures