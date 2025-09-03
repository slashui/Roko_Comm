import React from 'react'
import { useTranslations } from "next-intl";

/**
 * Gift Banner Component
 * 
 * Displays promotional discount banner with gift icon and text styling.
 */


const FrontGift = () => {
  const t = useTranslations("Landing");
  return (
<div className='text-zinc-400 text-sm flex flex-row items-center justify-center w-full'>
  <img 
    src='/icon/gift.svg' 
    className='w-4 fill-white mr-1' 
  />
  <span className='text-black dark:text-primary'>
    {t("30off")}
    &nbsp;
  </span>
  {t("30off1")}
</div>  )
}

export default FrontGift