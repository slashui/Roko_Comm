"use client";
import { useTheme } from "next-themes";
import React, { useState } from 'react';
import config from "@/config";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";

/**
 * A theme toggle button component that switches between dark and light modes
 * using next-themes for theme management.
 */



const ThemeSwitcher = () => { 
    const { theme, setTheme } = useTheme(config.colors.theme);

    return(
        <div className="mt-2 flex justify-center items-center pb-1 w-10 m-2 h-10 rounded-full  ">
            {/* The current theme is: {theme} */}
            {theme === "light" ? (
                <button onClick={() => setTheme("dark")}><img src="/icon/icon-moon.svg" width={25} className="transition-all duration-300 hover:brightness-0" /></button>
            ) : (
                <button onClick={() => setTheme("light")}><img src="/icon/icon-sun.svg" width={25} className="transition-all duration-300 hover:brightness-0 hover:invert" /></button>
            )}
            
        </div>
    );
};
export default ThemeSwitcher;