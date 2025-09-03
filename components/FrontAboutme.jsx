'use client'
import React, { useEffect, useRef,useState } from 'react'
import { Rocket } from 'lucide-react';
import { useTranslations } from "next-intl";


/**
 * Landing Page Bottom Section Component
 * 
 * Displays key features and technologies used in the project through interactive tags.
 * Includes user authentication, UI features, AI integrations, and core functionalities
 * with color-coded visual indicators.
 */





const FrontAboutme = () => {
  const [isHovered, setIsHovered] = useState(false);
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
  const tags = [
    
    [
      { text: 'User Auth', color: 'bg-green-400' },
      { text: 'Login/Registr', color: 'bg-blue-400' },
      { text: 'User Profile', color: 'bg-yellow-400' },
      { text: 'Password Reset', color: 'bg-red-400' },
    ],
   
    [
      { text: 'Dark/Light', color: 'bg-blue-400' },
      { text: 'DashboardUI', color: 'bg-yellow-400' },
      { text: 'Responsive', color: 'bg-red-400' },
      { text: 'i18n', color: 'bg-green-400' },
      { text: 'SEO', color: 'bg-blue-400' },
    ],
   
    [
      { text: 'ChatGPT', color: 'bg-yellow-400' },
      { text: 'Claude', color: 'bg-red-400' },
      { text: 'Gemini', color: 'bg-green-400' },
      { text: 'Image Gen', color: 'bg-blue-400' },
    ],
    
    [
      { text: 'Payment', color: 'bg-green-400' },
      { text: 'Emails', color: 'bg-blue-400' },
      { text: 'Waitlist', color: 'bg-yellow-400' },
      { text: 'LandingPage', color: 'bg-red-400' },
    ],
    
    [
      { text: 'MangoDB', color: 'bg-green-400' },
      { text: 'Prisma', color: 'bg-blue-400' },
      { text: 'Documents', color: 'bg-yellow-400' },
      { text: 'JavaScript', color: 'bg-red-400' },
    ]
];

  const SliderRow = ({ tags, direction = 'left', speed = 20 }) => {
    const sliderRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
      const slider = sliderRef.current;
      const content = contentRef.current;
      let animationFrameId;
      let offset = 0;

      const clonedContent = content.cloneNode(true);
      slider.appendChild(clonedContent);

      const scroll = () => {
        offset += direction === 'left' ? -0.5 : 0.5;
        if (direction === 'left' && -offset >= content.offsetWidth) {
          offset = 0;
        } else if (direction === 'right' && offset >= 0) {
          offset = -content.offsetWidth;
        }
        slider.style.transform = `translateX(${offset}px)`;
        animationFrameId = requestAnimationFrame(scroll);
      };

      animationFrameId = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(animationFrameId);
    }, [direction]);

    return (
      <div className="relative overflow-hidden whitespace-nowrap py-1 -rotate-12">
        <div ref={sliderRef} className="inline-block will-change-transform">
          <div ref={contentRef} className="inline-block">
            {tags.map((tag, idx) => (
              <div 
                key={idx} 
                className={`inline-flex items-center px-4 py-1.5 rounded-full ${tag.color} text-black mx-1.5`}
              >
                <span className="text-md font-medium whitespace-nowrap">{tag.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id='about' className='hidden md:flex container relative md:flex-row flex-col justify-center p-6 mx-auto w-full max-w-7xl py-24 text-2xl mt-12'>
      <div className='w-48 h-48 absolute mt-8 z-30 mr-32'>
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">{}</svg>
      </div>
      
      <div className='md:w-2/5 w-full relative overflow-hidden h-[400px]'>
      
        <div className="absolute left-0 top-0 w-60 h-full z-10 bg-gradient-to-r from-white dark:from-black via-white/95 dark:via-black/95 to-transparent"></div>
        
    
        <div className="transform translate-x-0">
          {tags.map((rowTags, idx) => (
            <div key={idx} className="my-1 p-2">
              <SliderRow 
                tags={rowTags} 
                direction={idx % 2 === 0 ? 'left' : 'right'} 
                speed={20 + idx * 5}
              />
            </div>
          ))}
        </div>
        
      
        <div className="absolute right-0 top-0 w-40 h-full z-10 bg-gradient-to-l from-white dark:from-black via-white/80 dark:via-black/80 to-transparent"></div>
      </div>

      <div className='md:w-3/5 w-full font-inter text-black dark:text-white pl-10'>
        <h1 className='font-inter text-4xl mb-4'>{t("about_title1")} <br />{t("about_title2")}</h1>
        <p className='font-archivo mb-12 text-zinc-400 text-base'>{t("about_main")}</p>
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
    </div>
  )
}

export default FrontAboutme