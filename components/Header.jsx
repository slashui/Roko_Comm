"use client";

import { useSession } from 'next-auth/react'
import React from 'react'
import ThemeSwitcher from './ThemeSwitcher';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { signOut } from 'next-auth/react';

/**
 * Dashboard Header Component
 * 
 * Top navigation bar with search, theme toggle, notifications and user profile controls.
 */


const Header = (props) => {
  const router = useRouter();
  const { data: session } = useSession()
  const [showLogout, setShowLogout] = useState(false);
  const lang = props.locale;
  const handleMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setShowLogout(false);
  };

  const handlesignOut = () => {

    signOut({
      callbackUrl: '/'
    });
  };

  return (

<div className="flex items-center justify-between p-4 w-full">
  <div className="bg-gray-100 flex rounded-xl w-full max-w-[360px] py-[14px] px-[18px] dark:bg-gray-dark-100">
    <img src="/icon/icon-search-normal.svg" alt="search icon" width={24} height={24} />
    <input 
      className="w-full bg-transparent border-none outline-none ring-0 pl-2 h-5 text-gray-300 focus:outline-none focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-gray-dark-300 placeholder:font-semibold" 
      type="text" 
      placeholder="Search" 
    />
    <img src="/icon/icon-microphone-2.svg" alt="microphone icon" width={24} height={24} />
  </div>
  <div className="flex items-center gap-[30px] xl:gap-[48px] ">
    <ThemeSwitcher />
    <div className="dropdown dropdown-end">
      <label className="cursor-pointer dropdown-label" tabIndex={0}>
        <div className="relative w-[26px] h-[26px]">
            <img className="object-cover" src="/icon/icon-messages.svg" alt="message icon" width={26} height={26} />
            <div className="w-2 h-2 dark:bg-primary bg-[#f7ce49] rounded-full absolute right-[1px] top-[-1px]"></div>
        </div>
      </label>
      <ul className="dropdown-content" tabIndex="0">
        <div className="relative menu rounded-box dropdown-shadow bg-white px-6 mt-[50px] min-w-[350px] pt-[21px] pb-[11px] dark:bg-dark-neutral-bg">
          <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute border-b-white w-[14px] top-[-7px] right-[18px] dark:border-b-dark-neutral-bg"></div>
          <div className="flex items-center justify-between pb-5 border-b border-neutral mb-[22px] dark:border-b-dark-neutral-border">
            <p className="text-sm leading-4 text-gray-1100 font-semibold dark:text-gray-dark-1100">New Messages</p>
            <a className="text-primary opacity-50 text-xs hover:opacity-75" href="#">View All</a>
          </div>
          {/* First Message */}
          <li className="rounded ml-[-14px] hover:bg-gray-100 w-[calc(100%+28px)] dark:hover:bg-gray-dark-100">
            <div className="flex items-start bg-transparent gap-[10px] p-[14px]">
              <img className="w-8 h-8 rounded-full" src="/pic/avatar6.png" alt="user avatar" />
              <div>
                <div className="flex items-center gap-[25px] mb-[7px]">
                  <p className="leading-4 text-gray-1100 font-semibold text-[10px] dark:text-gray-dark-1100">Esther Howard</p>
                  <p className="leading-4 text-gray-500 text-[10px] dark:text-gray-dark-500">3 mins ago</p>
                </div>
                <p className="leading-4 text-gray-500 text-[10px] dark:text-gray-dark-500 line-clamp-2">Please tell me how to develop this template to Tailwind CSS 3 and ReactJS ?</p>
              </div>
            </div>
          </li>
          <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border"></div>
          {/* Second Message */}
          <li className="rounded ml-[-14px] hover:bg-gray-100 w-[calc(100%+28px)] dark:hover:bg-gray-dark-100">
            <div className="flex items-start bg-transparent gap-[10px] p-[14px]">
              <img className="w-8 h-8 rounded-full" src="/pic/avatar2.png" alt="user avatar" />
                <div>
                  <div className="flex items-center gap-[25px] mb-[7px]">
                    <p className="leading-4 text-gray-1100 font-semibold text-[10px] dark:text-gray-dark-1100">Emma Watson</p>
                    <p className="leading-4 text-gray-500 text-[10px] dark:text-gray-dark-500">3 mins ago</p>
                  </div>
                  <p className="leading-4 text-gray-500 text-[10px] dark:text-gray-dark-500 line-clamp-2">Hey, I'm going to meet a friend of mine at the department store.</p>
                </div>
            </div>
          </li>
          <div className="w-full bg-neutral h-[1px] dark:bg-dark-neutral-border"></div>
          {/* Third Message */}
          <li className="rounded ml-[-14px] hover:bg-gray-100 w-[calc(100%+28px)] dark:hover:bg-gray-dark-100">
            <div className="flex items-start bg-transparent gap-[10px] p-[14px]">
              <img className="w-8 h-8 rounded-full" src="/pic/avatar3.png" alt="user avatar" />
              <div>
                <div className="flex items-center gap-[25px] mb-[7px]">
                  <p className="leading-4 text-gray-1100 font-semibold text-[10px] dark:text-gray-dark-1100">Elizabeth</p>
                  <p className="leading-4 text-gray-500 text-[10px] dark:text-gray-dark-500">3 mins ago</p>
                </div>
                <p className="leading-4 text-gray-500 text-[10px] dark:text-gray-dark-500 line-clamp-2">Good morning, How are you? What about our next meeting?</p>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
            
            
           <div className="dropdown dropdown-end">
              <label className="cursor-pointer dropdown-label" tabIndex={0}>
              <img className="w-10 h-10 rounded-full" src={session?.user?.image} alt="" />
              </label>
              <ul className="dropdown-content" tabIndex="0">
                <div className="relative menu rounded-box dropdown-shadow p-[25px] pb-[10px] bg-neutral-bg mt-[25px] md:mt-[40px] min-w-[237px] dark:text-gray-dark-500 dark:border-dark-neutral-border dark:bg-dark-neutral-bg">
                    <div className="border-solid border-b-8 border-x-transparent border-x-8 border-t-0 absolute w-[14px] top-[-7px] border-b-neutral-bg dark:border-b-dark-neutral-bg right-[18px]"></div>

                    {/* First Menu Item */}
                    <li className="text-gray-500 hover:text-gray-1100 hover:bg-gray-100 dark:text-gray-dark-500 dark:hover:text-gray-dark-1100 dark:hover:bg-gray-dark-100 rounded-lg group p-[15px] pl-[21px]">
                    <a className="flex items-center bg-transparent p-0 gap-[7px]" href="/home">
                        <i className="w-4 h-4 grid place-items-center">
                        <img className="group-hover:filter-black dark:group-hover:filter-white" src="/icon/icon-home-2.svg" alt="icon" />
                        </i>
                        <span>Home</span>
                    </a>
                    </li>

                    {/* Second Menu Item */}
                    <li className="text-gray-500 hover:text-gray-1100 hover:bg-gray-100 dark:text-gray-dark-500 dark:hover:text-gray-dark-1100 dark:hover:bg-gray-dark-100 rounded-lg group p-[15px] pl-[21px]">
                    <a className="flex items-center bg-transparent p-0 gap-[7px]" href={`/${lang}/setting/${session?.user?.id}`}>
                        <i className="w-4 h-4 grid place-items-center">
                        <img className="group-hover:filter-black dark:group-hover:filter-white" src="/icon/icon-project.svg" alt="icon" />
                        </i>
                        <span>Setting</span>
                    </a>
                    </li>

                    {/* Third Menu Item */}
                    <li className="text-gray-500 hover:text-gray-1100 hover:bg-gray-100 dark:text-gray-dark-500 dark:hover:text-gray-dark-1100 dark:hover:bg-gray-dark-100 rounded-lg group p-[15px] pl-[21px]">
                    <a className="flex items-center bg-transparent p-0 gap-[7px]" href="/notifications">
                        <i className="w-4 h-4 grid place-items-center">
                        <img className="group-hover:filter-black dark:group-hover:filter-white" src="/icon/icon-notification-bing.svg" alt="icon" />
                        </i>
                        <span>Notifications</span>
                    </a>
                    </li>

                    {/* Fourth Menu Item */}
                    <li className="text-gray-500 hover:text-gray-1100 hover:bg-gray-100 dark:text-gray-dark-500 dark:hover:text-gray-dark-1100 dark:hover:bg-gray-dark-100 rounded-lg group p-[15px] pl-[21px]">
                    <a className="flex items-center bg-transparent p-0 gap-[7px]" href="/analytics">
                        <i className="w-4 h-4 grid place-items-center">
                        <img className="group-hover:filter-black dark:group-hover:filter-white" src="/icon/icon-analytics.svg" alt="icon" />
                        </i>
                        <span>Analytics</span>
                    </a>
                    </li>

                    {/* Fifth Menu Item */}
                    <li className="text-gray-500 hover:text-gray-1100 hover:bg-gray-100 dark:text-gray-dark-500 dark:hover:text-gray-dark-1100 dark:hover:bg-gray-dark-100 rounded-lg group p-[15px] pl-[21px]">
                    <a className="flex items-center bg-transparent p-0 gap-[7px]" href="/preferences">
                        <i className="w-4 h-4 grid place-items-center">
                        <img className="group-hover:filter-black dark:group-hover:filter-white" src="/icon/icon-programming-arrows.svg" alt="icon" />
                        </i>
                        <span>Preferences</span>
                    </a>
                    </li>

                    {/* Divider */}
                    <div className="w-full bg-neutral h-[1px] my-[7px] dark:bg-dark-neutral-border"></div>

                    {/* Logout Menu Item */}
                    <li className="text-gray-500 hover:text-gray-1100 hover:bg-gray-100 dark:text-gray-dark-500 dark:hover:text-gray-dark-1100 dark:hover:bg-gray-dark-100 rounded-lg group p-[15px] pl-[21px]">
                    <a className="flex items-center bg-transparent p-0 gap-[7px]"  onClick={handlesignOut}>
                        <i className="w-4 h-4 grid place-items-center">
                        <img className="group-hover:filter-black dark:group-hover:filter-white" src="/icon/icon-logout.svg" alt="icon" />
                        </i>
                        <span>Log out</span>
                    </a>
                    </li>
                    
                </div>
                </ul>
            </div>
          </div>
        </div>




  )
}

export default Header