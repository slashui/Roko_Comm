"use client"
import { RecoveryContext } from '@/app/[locale]/(site)/(auth)/change/page'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useTranslations } from "next-intl"


/**
 * Password Recovery Flow - Step 1: Email Verification
 * 
 * This component handles the first step of the password recovery process where users enter their email.
 * The flow includes:
 * 1. User enters their registered email address
 * 2. System generates a random 4-digit OTP (One-Time Password)
 * 3. OTP is sent to user's email via the send API endpoint
 * 4. Upon successful email submission, user is redirected to OTP verification page
 * 
 * The component uses React Context (RecoveryContext) to manage the recovery flow state
 * across different steps of the process.
 */


const ChangeM =  () => {
    const t = useTranslations("ChangeOne");
    const { setEmail, setPage, email, otp , setOTP } = useContext(RecoveryContext) 
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "OneDay Build Password Reset",
        message: "Hello",
        DataOTP:""
    });



    const nagigateToOtp = async (e) => {

        
        e.preventDefault();
        
        const aOTP = Math.floor(Math.random() * 9000 + 1000);
            
            setOTP(aOTP)
            
            const updatedData ={ ...data, DataOTP: aOTP }
            console.log("updatedData:",updatedData)
           
            setEmail(data.email);
            setData({ ...data, DataOTP: abc })
            const response = await fetch("/api/send", {
                method: "POST",
                headers: {
                        "Content-type": "application/json",
                },
                body: JSON.stringify(updatedData)
                
        });
            
            
            setPage("otp")
            
            
    }

   
    const abc = () => {
        console.log(data.email)

        
    }

       
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData((prevState) => ({ ...prevState, email: value }));      };

  return (
    

       <div className='w-2/3 text-white'>
       
       <h1 className="text-4xl font-medium">{t("One")}</h1>
       <p className="text-zinc-400">{t("Two")}</p>

       <form action="" className="my-10">
           <div className="flex flex-col space-y-5">
               <label for="email">
                   <p className="font-medium text-zinc-400 pb-2">{t("Three")}</p>
                   <input id="email" value={data.email || ''} onChange={handleChange}  name="email"  type="email" className="w-full py-3 border bg-zinc-900 focus:bg-black border-zinc-700 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder={t("Four")} />
               </label>
              
               <button className="w-full rounded-full py-3 font-medium text-white bg-primary hover:bg-primary/80  border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center" onClick={nagigateToOtp}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                     </svg>
                     
                     <span className='text-black'>{t("Five")}</span>
               </button>
               <p className="text-center">{t("Six")}? <a href="#" className="text-primary hover:text-primary/80 font-medium inline-flex space-x-1 items-center"><span>{t("Seven")} </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                 </svg></span></a></p>
           </div>
       </form> 
       
   </div>
       

  )
}

export default ChangeM