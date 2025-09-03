"use client"
import React from 'react'
import { useState } from 'react';
import { useTranslations } from "next-intl";



/**
 * Landing Page Stepper Component
 * 
 * Displays 4-step process showing how quickly users can build with the toolkit.
 */



const FrontStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = 4; 
  const t = useTranslations("Landing");
  const getContentStyle = (index) => {
    return {
      transform: `translateX(-${index * 100}%)`,
      transition: 'transform 0.5s ease-in-out'
    };
  };
  const stepTitles = [
    t("Step1title"),
    t("Step2title"),
    t("Step3title"),
    t("Step4title")
  ]; 
  return (
    <div className="container flex flex-col justify-center p-6 mx-auto  w-full max-w-7xl my-8 text-gray-700 dark:text-white mt-16">
    <div className='w-full'>
    <h1 className='lg:text-5xl md:text-4xl text-3xl justify-center mx-auto flex font-inter '>{t("StepTitle")}</h1>
        </div>
        

        <div className="container mx-auto md:p-4 p-0 pt-4 ">
      {/* Stepper navigation */}
      <div className="flex items-center justify-center mb-4 w-full md:w-2/3 mt-6 mx-auto">
        {/* Stepper dots and lines */}
        {[...Array(steps)].map((_, index) => (
          <React.Fragment key={index}>
            <div>
            <div 
              className={`w-16 h-16 flex relative justify-center font-inter items-center text-4xl rounded-full border mx-auto cursor-pointer ${index <= activeStep ? 'dark:bg-primary bg-green-700  dark:text-black text-white' : 'text-green-700/50 border-green-700/50 dark:text-primary/50 dark:border-primary/50'}`}
              onClick={() => setActiveStep(index)}
            >{index + 1}</div>
            <div className={`absolute flex justify-center items-center mt-2 ${index <= activeStep ? ' dark:text-primary text-green-700 font-bold' : 'text-green-700/50 border-green-700/50 dark:text-primary/50 dark:border-primary/50'}`}>{stepTitles[index]}</div></div>
            {index < steps - 1 && (
              <div 
                className={`flex-grow h-1 bg-gray-300/50 relative`}>
                  <div 
                    className={`absolute top-0 left-0 w-full h-1 ${index < activeStep ? 'bg-green-700 dark:bg-primary' : 'bg-gray-300/50'} transition-width duration-500`}
                    style={{width: index < activeStep ? '100%' : '0%'}}
                  ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Content area */}
      <div className="overflow-hidden mt-12"> {/* This div forces the content area to only show the current step */}
        <div className="flex">
          
            <div key="0" style={getContentStyle(activeStep)} className="min-w-full md:p-8 p-4 dark:bg-[#d9d9d9]/10 bg-white flex md:flex-row flex-col rounded-2xl ">
             <div className='md:w-1/2 w-full'>
              <h2 className='font-inter text-3xl text-green-700 dark:text-primary mb-2'>{t("Step1title1")} </h2>
              <p className='text-xl'>{t("Step1main")}</p>
             </div>
             <div className='md:w-1/2 w-full md:pl-16 flex flex-row h-full'>
              <div>
              <div className='mr-16'>
                <h2 className='font-inter text-2xl my-2'>Auth</h2>
                <a className='px-4 py-1 text-black hover:bg-[#8F6CEF]/80 bg-[#8F6CEF] rounded-full inline-block max-w-min mr-2 mb-2'>Github</a>
                <a className='px-4 py-1 text-black hover:bg-[#F75F8F]/80 bg-[#F75F8F] rounded-full inline-block max-w-min'>Google</a>
              </div>
              <div className='mt-8'>
                <h2 className='font-inter text-2xl my-2'>Email</h2>
                <a className='px-4 py-1 text-black hover:bg-[#92E3A9]/80 bg-[#92E3A9] rounded-full inline-block max-w-min mr-2'>Resend</a>
              </div>
              </div>
              <div><div >
                <h2 className='font-inter text-2xl my-2'>Database</h2>
                <a className='px-4 py-1 text-black hover:bg-[#EFD26C]/80 bg-[#EFD26C] rounded-full inline-block max-w-min mr-2'>MangoDB</a>
               
              </div>
              <div className='mt-8'>
                <h2 className='font-inter text-2xl my-2'>Payment</h2>
                <a className='px-4 py-1 text-white hover:bg-[#635BFF]/80 bg-[#635BFF] rounded-full inline-block max-w-min mr-2'>Stripe</a>
               
              </div></div>
             </div>
            </div>
            <div key="1" style={getContentStyle(activeStep)} className="min-w-full dark:bg-[#d9d9d9]/10 bg-white md:p-8 p-4 flex md:flex-row flex-col rounded-2xl">
             <div className='md:w-1/2 w-full'>
             <h2 className='font-inter text-3xl dark:text-primary text-green-700 mb-2'>{t("Step2title")}</h2>
              <p className='text-xl'>{t("Step2main")}</p>
             </div>
             <div className='md:w-1/2 w-full h-32 rounded-xl flex justify-center items-center relative'><img src='/pic/config.svg' className='rounded-2xl w-full absolute md:top-[-70px] top-0'/></div>
            </div>
            <div key="2" style={getContentStyle(activeStep)} className="min-w-full bg-white dark:bg-[#d9d9d9]/10 md:p-8 p-4 flex flex-col md:flex-row rounded-2xl">
              
            <div className='md:w-1/2 w-full'>
             <h2 className='font-inter text-3xl text-green-700 dark:text-primary mb-2'>{t("Step3title")}</h2>
              <p className='text-xl'>{t("Step3main")}</p>
             </div>
             <div className='md:w-1/2 w-full h-32 rounded-xl flex justify-center items-center relative'><img src='/pic/doctor.svg' className='rounded-2xl w-full absolute md:top-[-130px] top-0'/></div>
            


            </div>
            <div key="3" style={getContentStyle(activeStep)} className="min-w-full dark:bg-[#d9d9d9]/10 bg-white md:p-8 p-4 flex flex-col md:flex-row rounded-2xl">
             
             
            <div className='md:w-1/2 w-full'>
             <h2 className='font-inter text-3xl text-green-700 dark:text-primary mb-2'>{t("Step4title")}</h2>
              <p className='text-xl'>{t("Step4main")}<span className='font-bold font-inter text-green-700 dark:text-primary'>Good luck.</span></p>
             </div>
             <div className='md:w-1/2 w-full h-32 rounded-xl flex justify-center items-center relative'><img src='/pic/lunch.svg' className='rounded-2xl w-full absolute md:top-[-150px] top-[30px]'/></div>
            

            </div>
         
        </div>
      </div>
      
    </div>


        </div>
  )
}

export default FrontStepper