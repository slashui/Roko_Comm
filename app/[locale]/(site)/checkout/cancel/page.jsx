"use client"
import React, { useState, useEffect } from 'react';
import FrontPrice from '@/components/FrontPrice';
import FrontFooter from '@/components/FrontFooter';

const page = () => {


  return (
    <div className='text-white w-full h-full flex items-center justify-center flex-col'>
      <div className='max-w-6xl w-full min-w-96 h-screen'>
        <div className='py-8'><a href='/'><img src='/pic/logo.png' className='w-16' /></a></div>
        <div className='w-full flex justify-center'><img src='/pic/wrong.png' className='w-1/2' /></div>
        <h1 className='text-5xl py-5 font-inter font-bold text-primary flex justify-center'>Maybe Something Wrong There.</h1>
        <p className='text-lg py-2 font-Fira text-zinc-400 flex justify-center items-center flex-col'>
          You can buy it again via the purchase link below. <br />
        </p>
        <FrontPrice />
        <div className='h-10 w-full'></div>
        <FrontFooter />
      </div>
    </div>
  )
}

export default page