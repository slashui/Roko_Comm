"use client"
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

/**
 * Language Switcher Component
 * 
 * Toggles between English and Chinese language versions of the site.
 * Display this component if your system supports multiple languages.
 */


const LanguageSwitcher = () => {
  const [lang, setLang] = useState("");
  const [imageSrc, setImageSrc] = useState('');
  const [linkPath, setLinkPath] = useState('');
  const [current, setCurrent] = useState('');
  useEffect(() => {
    const langValue = document.documentElement.getAttribute('lang');
    let src, path, current;

    switch (langValue) {
      case 'cn':
        src = '/icon/en.svg';
        path = '/en/dashboard';
        current = 'CN';
        break;
      case 'en':
        src = '/icon/cn.svg';
        path = '/cn/dashboard';
        current = 'EN';
        break;
      default:
        src = 'default.svg'; // Just an example, replace with actual default image if necessary
        path = '/';
    }

    setImageSrc(src);
    setLinkPath(path);
    setCurrent(current);
  }, []);
  return (
    <div className="mt-2 flex justify-center items-center  w-10 m-2 h-10 rounded-full  bg-white dark:bg-zinc-600/20 hover:dark:bg-zinc-600/40 hover:bg-zinc-100"> 
      
       <a href={linkPath} className='font-inter text-xl text-zinc-500 dark:text-zinc-200'>
            {current}
          {/* <img src={imageSrc} width="25px" className='fill-red-500' /> */}
        </a>
    </div>
  )
}

export default LanguageSwitcher