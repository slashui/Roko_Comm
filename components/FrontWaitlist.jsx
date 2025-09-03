"use client"
import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import Typed from "typed.js";
import { useEffect, useRef , useState } from "react";
import WaitlistForm from './FrontWaitlistForm';


/**
 * Landing Page Waitlist Component
 * 
 * Temporary waitlist section for pre-launch signups, featuring animated typing effect
 * and email collection form.
 */


const FrontWaitlist = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseClick = () => {
    setShowForm(false);
  };
  const el = useRef(null);
  const backgroundImageUrl = 'url("/pic/bg-waitlist.svg")';

  const divStyle = {
    backgroundImage: backgroundImageUrl,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["AI Application", "AI Agent", "Block Chain", "More SaaS"], // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 150,
      backSpeed: 100,
      backDelay: 400,
      loop: true,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);
  return (
   
    <div className='w-full  bg-primary dark:bg-[#101112] ' style={divStyle}>
      <div className="container flex flex-col justify-center p-6 mx-auto  md:flex-row md:justify-between max-w-screen-xl">
        <div className="flex  w-full items-center flex-col justify-center p-6  rounded-sm text-left">
      
        <div className='flex w-full justify-between'>
          <img src='/logo.png' className='w-28 mb-8' />
        </div>
        <h1 className="text-2xl  font-inter text-white sm:text-5xl">Focus on Your <span ref={el}></span></h1>
        <h1 className="text-2xl font-inter text-white sm:text-5xl">Leave the Basics to <span className='font-bold dark:text-primary text-[#182b00]'  style={{ display: 'inline' }}>OneDay.Build</span></h1>

        <div className="mt-6 mb-8 text-lg flex leading-6 items-center justify-center w-full sm:mb-8  dark:text-zinc-400 text-zinc-700">
          <p align="center">
            Welcome to the public testing phase of our platform! <br />
            Leave your email and project details in the waitlist below to participate.
          </p>
  
        </div>
        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
          <button onClick={() => setShowForm(true)} rel="noopener noreferrer" href="#" className="md:w-[240px] w-full flex justify-center py-2 text-lg font-semibold bg-black text-white rounded-full dark:bg-primary hover:dark:bg-primary/80 dark:text-gray-900">
          Join the Waitlist</button>
          {showForm ? (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
              <button onClick={handleCloseClick} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="bg-black rounded p-8 xl:w-1/3 lg:w-1/2 m-16 w-full shadow-md relative">
                <WaitlistForm onClose={() => setShowForm(false)} />
              </div>
            </div>
          ) : null}
        
    
        </div>
      </div>
    
    </div>
</div>
  )
}

export default FrontWaitlist