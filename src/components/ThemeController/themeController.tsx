"use client";
import { useAtom } from "jotai";
import { persistentThemeAtom } from "../../atoms/atoms";
import "./themeController.css";
import { useEffect, useRef, useState } from "react";
import gsap from 'gsap'

interface theme{
  id:string | number,
  theme: string,
  primary: string,
  secondary: string,
  accent:string,
  neutral: string,
}

// Function to get actual DaisyUI theme colors
const getThemeColors = (themeName: string) => {
  // Create a temporary element to apply the theme and read its colors
  const tempDiv = document.createElement('div');
  tempDiv.setAttribute('data-theme', themeName);
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.visibility = 'hidden';
  document.body.appendChild(tempDiv);

  // Get computed styles for the theme colors
  const computedStyle = getComputedStyle(tempDiv);
  const primary = computedStyle.getPropertyValue('--p') || '#661AE6';
  const secondary = computedStyle.getPropertyValue('--s') || '#D926A9';
  const accent = computedStyle.getPropertyValue('--a') || '#1FB2A6';
  const neutral = computedStyle.getPropertyValue('--n') || '#191D24';

  // Clean up
  document.body.removeChild(tempDiv);

  return {
    primary: primary.trim(),
    secondary: secondary.trim(),
    accent: accent.trim(),
    neutral: neutral.trim(),
  };
};

const ThemeController = () => {
  const [, setTheme] = useAtom(persistentThemeAtom);
  const [openTheme, setOpenTheme] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  const themes: theme[] = [
    {
      id: 0,
      theme: 'dark',
      primary: "#ffffff",
      secondary: "#D926A9",
      accent: "#1FB2A6",
      neutral: "#191D24",
    },
    {
      id: 1,
      theme: 'night',
      primary: "#3b82f6",
      secondary: "#f59e0b",
      accent: "#10b981",
      neutral: "#1f2937",
    },
    {
      id: 2,
      theme: 'corporate',
      primary: '#4b6bfb',
      secondary: '#7b92b2',
      accent: '#4b6bfb',
      neutral: '#181a2a',
    },
  ];

  const handleThemeChange2 = (theme: string) => {
    setTheme(theme);
  };

  useEffect(()=>{
    const themeAnimation = themeRef.current
    if(themeAnimation){
      
      const dance =()=>{
        const tl = gsap.timeline();
        tl.to(themeAnimation,{
          duration: 0.3,
          rotate: 25,
          ease: "back.in(2)",
          repeat: 1,
          yoyo: true,
        })
        tl.to(themeAnimation,{
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        })
      }

      themeAnimation.addEventListener("mouseenter",dance);



    }

  },[])

  return (
    <div>
      <div style={{zIndex: 10}}
      ref={themeRef}
        className="flex hover:bg-white hover:bg-opacity-[0.1] justify-center items-center   w-fit   rounded-[15px]  cursor-pointer p-0"
        onClick={() => setOpenTheme(!openTheme)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          className={"z-10"}
          fill="currentColor"
        >
          <path d="M9.38 21.646A9.985 9.985 0 0 0 12 22l.141-.001a2.998 2.998 0 0 0 2.515-1.425c.542-.876.6-1.953.153-2.88l-.198-.415c-.453-.942-.097-1.796.388-2.281.485-.485 1.341-.841 2.28-.388h.001l.413.199a2.99 2.99 0 0 0 2.881-.153A2.997 2.997 0 0 0 22 12.141a9.926 9.926 0 0 0-.353-2.76c-1.038-3.827-4.353-6.754-8.246-7.285-3.149-.427-6.241.602-8.471 2.833S1.666 10.247 2.096 13.4c.53 3.894 3.458 7.208 7.284 8.246zM15.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-5-1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 15.506a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-2.5-6.5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 6.5 9.006z"></path>
        </svg>
      </div>

      {openTheme && (
        <div className="gap-[1rem] z-[10] flex flex-col absolute top-[2.5rem] right-8 w-[15%] bg-white bg-opacity-[0.1] p-3 rounded-[15px]">
          {themes.map((theme) => (
            <div onClick={() => handleThemeChange2(theme.theme)} key={theme.id} className="flex justify-between p-4 hover:bg-base-200 hover:bg-opacity-[1]  rounded-[15px]  cursor-pointer bg-base-100 ">
              <p className=" ">
                {theme.theme}
              </p>
              <div className="flex  gap-2 p-[0.5]">
                <div style={{backgroundColor: theme.primary}} className={`w-[7px] h-[90%] rounded-full`}></div>
                <div style={{backgroundColor: theme.secondary}} className={`w-[7px] h-[90%] rounded-full`}></div>
                <div style={{backgroundColor: theme.accent}} className={`w-[7px] h-[90%] rounded-full`}></div>
                <div style={{backgroundColor: theme.neutral}} className={`bg-base-200 w-[7px] h-[90%] rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeController;