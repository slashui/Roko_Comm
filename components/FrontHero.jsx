'use client'
import React, { useState, useEffect, useRef } from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import Typed from "typed.js";
import FrontGift from './FrontGift';
import { Rocket } from 'lucide-react';
import { useTranslations } from "next-intl";

/**
 * Hero Section Component
 * 
 * Landing page welcome section with animated typing effect and 
 * floating tech stack icons.
 */


const FrontHero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const el = useRef(null);
  const t = useTranslations("Landing");
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector('#price');
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["AI Application", "AI Agent", "Block Chain", "More SaaS"],
      startDelay: 300,
      typeSpeed: 150,
      backSpeed: 100,
      backDelay: 400,
      loop: true,
      cursorChar: '<span class="typed-cursor">|</span>', 
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="w-full relative">
      
      <div className="absolute inset-0 overflow-hidden hidden md:block" style={{ zIndex: 1 }}>
          <div className="absolute left-0 top-0 w-full h-full z-0">
            <img 
              src="/icon/Hero_nextauth.svg" 
              className="absolute left-[10%] top-[30%] w-14 opacity-20 dark:opacity-100 transition-opacity duration-300 hover:opacity-50 animate-float-slow"
              alt="NextAuth Logo"
            />
            <img 
              src="/icon/Hero_nextjs.svg" 
              className="absolute left-[15%] top-[55%] w-18 opacity-20 dark:opacity-100 transition-opacity duration-300 hover:opacity-50 animate-float-medium"
              alt="Next.js Logo"
            />
            <img 
              src="/icon/Hero_tailwindcss.svg" 
              className="absolute left-[8%] top-[75%] w-16 opacity-20 dark:opacity-100 transition-opacity duration-300 hover:opacity-50 animate-float-fast"
              alt="Tailwind Logo"
            />
          </div>
      
          
          <div className="absolute right-0 top-0 w-full h-full pointer-events-none z-0">
            <img 
              src="/icon/Hero_r.svg" 
              className="absolute right-[12%] top-[10%] w-14 opacity-30 dark:opacity-100 transition-opacity duration-300 hover:opacity-50 animate-float-medium"
              alt="R Logo"
            />
            <img 
              src="/blackfriday.png" 
              className="absolute right-[8%] top-[25%] w-48 opacity-100 dark:opacity-100 transition-opacity duration-300 hover:opacity-50 animate-float-slow"
              alt="Stripe Logo"
            />
            <img 
              src="/icon/Hero_mangodb.svg" 
              className="absolute right-[15%] top-[65%] w-16 opacity-30 dark:opacity-100 transition-opacity duration-300 hover:opacity-50 animate-float-fast"
              alt="MongoDB Logo"
            />
          </div>
        </div>
        <div className="relative " style={{ zIndex: 10 }}>
          <div className="container flex flex-col justify-center p-6 mx-auto md:justify-between max-w-screen-xl bg-[url('/hero_bg.png')] bg-no-repeat bg-center bg-contain  z-10 ">
            <div className='flex max-w-[1440px] justify-between items-center'>
              <img src='/pic/logo-block.png' className='w-14 my-4' alt="Logo" />
              {/* <a className='md:hidden flex items-center h-10 m-2 px-6 border dark:border-primary bg-black rounded-full text-primary hover:bg-zinc-500/20 font-bold'>Login</a> */}
            </div>

            <div className='flex flex-row'>
              <div className="flex w-full flex-col justify-center md:p-6 p-0 rounded-sm text-center dark:text-zinc-500 text-zinc-600 mt-2">
                <h1 className="text-4xl font-inter leadi sm:text-5xl text-black dark:text-white">{t("banner1")} <span ref={el} className="inline-block w-full sm:w-auto sm:inline"></span></h1>
                <h1 className="text-4xl font-inter leadi sm:text-5xl text-black dark:text-white">{t("banner2")} <span className='font-bold dark:text-primary text-[#182b00]' style={{ display: 'inline' }}>OneDay.Build</span></h1>

                <p className="mt-6 mb-8 md:text-lg text-sm sm:mb-8 leading-6 dark:text-zinc-400 text-zinc-500">
                  {t("sub-banner1")}<br />
                  {t("sub-banner2")}<br />
                  {t("sub-banner3")}
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-center w-full mb-2">
                  <a
                    href="#price"
                    className={`
                      md:w-[280px] p-3 w-full flex justify-center items-center text-lg font-bold
                      bg-black text-white rounded-full dark:bg-primary 
                      hover:dark:bg-primary/80 dark:text-gray-900 pr-6
                      transition-all duration-300 ease-in-out
                      ${isHovered ? 'transform translate-y-[-5px] shadow-lg' : ''}
                    `}
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Rocket 
                      className={`w-7 h-7 mr-1 transition-all duration-300 ease-in-out ${isHovered ? 'animate-pulse' : ''}`}
                    />
                    <span className={`transition-all duration-300 ease-in-out ${isHovered ? 'tracking-wider' : ''}`}>
                    {t("button-action")}
                    </span>
                  </a>
                </div>
                <FrontGift />
              </div>
              
            </div>
          </div>
      
        </div>
    </div>
  )
}

export default FrontHero