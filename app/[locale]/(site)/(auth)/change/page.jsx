"use client"
import React from 'react'
import ChangeM from '@/components/ChangeIndex';
import OTPinput from '@/components/ChangeOTP';
import Reset from '@/components/ChangeReset';
import Success from '@/components/ChangeReset-Success';
import { createContext } from 'react';
import { useState } from 'react';

export const RecoveryContext = createContext(); 

const Change = () => {

  const [page, setPage] = useState("ChangeM");
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState();

  function NavigateComponents(){
    if (page === "ChangeM") return <ChangeM />;
    if (page === "otp") return <OTPinput />;
    if (page === "reset") return <Reset />;
    if (page === "success") return <Success />; 
    
  }
  
  const showdata = () => {
    console.log("email:",email)
    console.log("otp:",otp)
  }

  return (
    <RecoveryContext.Provider value={{ page, setPage, otp, setOTP,setEmail, email }}>
      <NavigateComponents />

   </RecoveryContext.Provider>


  )
}

export default Change