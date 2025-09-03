"use client"
import React from 'react'
import { useEffect, useRef , useState } from "react";
import { useTranslations } from "next-intl";

const FloatingSquare = ({ size, color, initialPosition }) => {
  return (
    <div
      className="absolute rounded-lg animate-float-random"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        left: `${initialPosition.x}%`,
        top: `${initialPosition.y}%`,
        opacity: 0.6,
        transition: 'all 0.3s ease',
      }}
    />
  );
};


const GridBackground = ({ children }) => {
  return (
    <div className="min-h-[370px] rounded-lg w-full relative">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff20 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />
      {children}
    </div>
  );
};

const AILogo = ({ src, size, position, animation }) => (
  <div 
    className={`absolute rounded-lg ${animation} hover:scale-110 transition-all cursor-pointer duration-300 hover:brightness-125`}
    style={{
      width: size,
      height: size,
      ...position
    }}
  >
    <img 
      src={src} 
      alt="AI Logo"
      className="w-full h-full p-2 drop-shadow-lg" 
    />
  </div>
);


const FrontAI = () => {
  const [squares, setSquares] = useState([]);
  const t = useTranslations("Landing");
  useEffect(() => {
    
    const newSquares = Array(4).fill(null).map(() => ({
      size: Math.random() * (100 - 30) + 30, 
      color: `hsl(${Math.random() * 360}, 70%, 50%)`, 
      initialPosition: {
        x: Math.random() * 80 + 10, 
        y: Math.random() * 80 + 10, 
      },
    }));
    setSquares(newSquares);
  }, []);

  return (

    <div className="max-w-6xl mx-auto md:mt-32 mt-16">
        <h1 className='lg:text-5xl md:text-4xl text-3xl px-6 flex font-inter md:my-16 my-8 text-white'><span className='text-primary'> OneDay.Build </span> &nbsp;{t("ai-title-2")}</h1>
        <div className="flex flex-col md:flex-row gap-4 mx-4 md:mx-0">
        <div className="flex flex-col w-full md:w-1/3 border border-white/20 rounded-lg bg-[#1f1f1f]">
          <GridBackground>
        <div className="p-4 relative">
        <div className="w-full rounded-lg bg-[#2A2A2A] overflow-hidden relative z-10 border  border-white/10">
             
              <div className="h-8 bg-[#1C1C1C] flex items-center px-4">
               
                <div className="flex gap-2">
                 
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                 
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                 
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
              </div>
            
            
              <div className="h-[300px] overflow-hidden">
                  <img 
                    src="/landing_img.png" 
                    alt="description"
                    className="w-full h-full object-cover"
                  />
               
              </div>
            </div>
            </div>
          </GridBackground>
          <div className='mx-6 mb-6'>
                  <h2 className='text-2xl text-white'>{t("ai-section-1-title")}</h2>
                  <p className='text-sm text-white/50'>{t("ai-section-1-main")}</p>
                </div>
          </div>
         
          <div className="flex flex-col md:w-1/3 border border-white/20  rounded-lg bg-[#1f1f1f]">
          <GridBackground>
          <div className="relative w-full overflow-hidden">
            <div className="min-w-full flex justify-center">
              <div className="w-[500px] flex flex-row pt-20">
                <div className='w-[180px] text-center text-white/50 text-inter font-bold '>
                <div className='w-[180px] h-[180px]'>
                  <img src='/pic/logo-block.png' className='w-full h-full object-contain' />
                
                </div> OneDay.Build</div>
                <div className='w-[100px] h-[180px] flex items-center text-white/50 justify-center text-6xl animate-rotate-plus'>
                  +
                </div>
                <div className='w-[180px] text-center text-white/50 text-inter font-bold '>
                <div className='w-[180px] h-[180px]'>
                  <img src='/icon/Cursor.svg' className='w-full h-full object-contain' />
                </div>Cursor
                </div>
                
              </div>
            </div>
          </div>
          </GridBackground>
            <div className='mx-6 mb-6'>
              <h2 className='text-2xl text-white'>{t("ai-section-2-title")}</h2>
              <p className='text-sm text-white/50'>{t("ai-section-2-main")} </p>
            </div>
          </div>
          <div className="flex flex-col md:w-1/3 border border-white/20 rounded-lg bg-[#1f1f1f]">
          <GridBackground>
    


        
    <div className="relative mx-auto text-center">
     
        <div className="relative h-[370px] w-full mx-auto rounded-lg overflow-hidden">
        <AILogo 
          src="/icon/chatgpt.svg"
          size="120px"
          position={{ left: '10%', top: '17%' }}
          animation="animate-float" 
          />

        <AILogo 
          src="/icon/Claude.svg"
          size="130px"
          position={{ right: '10%', top: '7%' }}
          animation="animate-bounce-slow" 
          />

        <AILogo 
          src="/icon/groq.svg"
          size="90px"
          position={{ left: '25%', bottom: '15%' }}
          animation="animate-pulse-spin" 
          />

        <AILogo 
          src="/icon/Gemini.svg"
          size="130px"
          position={{ right: '20%', bottom: '25%' }}
          animation="animate-float-reverse" 
          />
          
        </div>
      </div>
      </GridBackground>
      <div className='mx-6 mb-6'>
                  <h2 className='text-2xl text-white'>{t("ai-section-3-title")} </h2>
                  <p className='text-sm text-white/50'>{t("ai-section-4-main")} </p>
                </div>
          </div>
        </div>
    </div>


  )
}

export default FrontAI