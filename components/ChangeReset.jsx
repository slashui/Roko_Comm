
import React, { useContext, useState } from 'react'; 
import axios from "axios"
import { toast } from "react-hot-toast"
import { RecoveryContext } from '@/app/[locale]/(site)/(auth)/change/page';
import { useTranslations } from "next-intl"

/**
 * Password Recovery Flow - Step 3: Reset Password
 * 
 * This component handles the final step of the password recovery process where users set their new password.
 * The flow includes:
 * 1. User enters their new password
 * 2. User confirms the new password by entering it again
 * 3. System validates that both passwords match
 * 4. Upon successful validation, password is updated in the database
 * 5. User is redirected to success page
 * 
 * Features:
 * - Password matching validation
 * - Error handling for database updates
 * - Success notifications using toast messages
 * - Secure password update via API endpoint
 */


const Reset = () => {
  const t = useTranslations("ChangeReset");
    const { email, setPage } = useContext(RecoveryContext);
    console.log("email:",email)
    const [data, setData] = useState({
        email: email,
        password: ''
        })
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setData(prevData => ({
            ...prevData,
            password: event.target.value
          }));
        console.log("password:",password)
      };
    
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        console.log("ConfirmPassword:",confirmPassword)
      };
      const handleButtonClick = async (event,req, res) => {
        event.preventDefault(); 
        try{
        if (password === confirmPassword) {
            
                await axios.post('/api/change', data);
                toast.success('Password has been changed!');
                setPage('success');
         
        } else {
          toast.error('Passwords do not match!');
        }
      }catch (error) {
        if (error.code === 'P2025') {
          // Handle the specific error accordingly
          return res.status(404).json({
            message: 'Record to update was not found'
          });
        }

      };
    }

  return (

      <div className='w-2/3 text-white'>
       <h1 className="text-4xl font-medium"> {t("One")}</h1>
       <p className="text-zinc-400"> {t("Two")}</p>

       <form action="" className="my-10">
           <div className="flex flex-col space-y-5">
               <label for="email">
                   <p className="font-medium text-zinc-400 pb-2"> {t("Three")}</p>
                   <input id="password" name="password" onChange={handlePasswordChange} type="password" className="w-full py-3 border bg-zinc-900 focus:bg-black border-zinc-700 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder= {t("Four")} />
               </label>
              
              
               <label for="ConfPassword">
                   <p className="font-medium text-zinc-400 pb-2"> {t("Five")}</p>
                   <input id="ConfPassword" name="password" type="password" onChange={handleConfirmPasswordChange} className="w-full py-3 border bg-zinc-900 focus:bg-black border-zinc-700 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder= {t("Six")} />
               </label>
              
               <button className="w-full rounded-full py-3 font-medium text-white bg-primary hover:bg-primary/80  border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center" onClick={handleButtonClick}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                     </svg>
                     
                     <span className='text-black'> {t("Seven")}</span>
               </button>
               <p className="text-center"> {t("Eight")}? <a href="#" className="text-primary hover:text-primary/80 font-medium inline-flex space-x-1 items-center"><span> {t("Nine")} </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                 </svg></span></a></p>
           </div>
       </form>
        
   </div>
       

  )
}

export default Reset