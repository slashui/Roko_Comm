import React from 'react'
import { useTranslations } from "next-intl"
import { useLocale } from 'next-intl';

/**
 * Password Recovery Flow - Final Step: Success Page
 * 
 * This component displays the success message after password has been successfully reset.
 * It serves as the final step in the password recovery workflow, showing:
 * 1. A confirmation message that the password has been changed
 * 2. Instructions for using the new password
 * 3. A button to return to the login page
 * 
 * The component provides a clear indication to users that their password recovery
 * process is complete and they can now log in with their new credentials.
 */



const ResetSuccess = () => {
  const locale = useLocale();
  const t = useTranslations("ChangeSuccess");
  return (
    <div className='w-full h-screen bg-black text-zinc-200 flex justify-center items-center flex-col'>
      <h1 className='text-4xl text-primary font-inter mb-2'>{t("One")}</h1>
      {t("Two")}<br />
      {t("Three")}
      <button type="submit" onClick={() => window.location.href = `/${locale}/login`} className=" mt-6  rounded-full py-3 text-black font-medium w-1/3 bg-white hover:bg-primary/80  border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">{t("Four")}</button>
    </div>

  )
}

export default ResetSuccess