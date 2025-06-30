"use client";
import { useAtom } from "jotai";
import { persistentThemeAtom } from "../../atoms/atoms";
import "./themeController.css";
import { useEffect, useRef, useState } from "react";
import gsap from 'gsap'

export interface theme{
  id:string | number,
  theme: string,
  primary: string,
  secondary: string,
  accent:string,
  neutral: string,
}

export const themes: theme[] = [
  {
    id: 0,
    theme: 'light',
    primary: '#570df8',
    secondary: '#f000b8',
    accent: '#37cdbe',
    neutral: '#3d4451',
  },
  {
    id: 1,
    theme: 'dark',
    primary: '#661ae6',
    secondary: '#d926a9',
    accent: '#1fb2a6',
    neutral: '#191d24',
  },
  {
    id: 2,
    theme: 'cupcake',
    primary: '#65c3c8',
    secondary: '#ef9fbc',
    accent: '#eeaf3a',
    neutral: '#291334',
  },
  {
    id: 3,
    theme: 'bumblebee',
    primary: '#f9d72f',
    secondary: '#f000b8',
    accent: '#37cdbe',
    neutral: '#3d4451',
  },
  {
    id: 4,
    theme: 'emerald',
    primary: '#66cc8a',
    secondary: '#377cfb',
    accent: '#ea5234',
    neutral: '#333c4d',
  },
  {
    id: 5,
    theme: 'corporate',
    primary: '#4b6bfb',
    secondary: '#7b92b2',
    accent: '#67cba0',
    neutral: '#181a2a',
  },
  {
    id: 6,
    theme: 'synthwave',
    primary: '#e779c1',
    secondary: '#58c7f3',
    accent: '#f3cc30',
    neutral: '#20134e',
  },
  {
    id: 7,
    theme: 'retro',
    primary: '#ef9995',
    secondary: '#a4cbb4',
    accent: '#ebdc99',
    neutral: '#7c3aed',
  },
  {
    id: 8,
    theme: 'cyberpunk',
    primary: '#ff7598',
    secondary: '#75d1f0',
    accent: '#c07eff',
    neutral: '#423f00',
  },
  {
    id: 9,
    theme: 'valentine',
    primary: '#e96d7b',
    secondary: '#a991f7',
    accent: '#f3ccff',
    neutral: '#f3f4f6',
  },
  {
    id: 10,
    theme: 'halloween',
    primary: '#f28c18',
    secondary: '#661ae6',
    accent: '#fbbc04',
    neutral: '#1c1b1b',
  },
  {
    id: 11,
    theme: 'garden',
    primary: '#5c7f67',
    secondary: '#8ecd9e',
    accent: '#f9c784',
    neutral: '#2f3e46',
  },
  {
    id: 12,
    theme: 'forest',
    primary: '#1eb854',
    secondary: '#1fd65f',
    accent: '#d99330',
    neutral: '#110e0e',
  },
  {
    id: 13,
    theme: 'aqua',
    primary: '#09ecf3',
    secondary: '#836fff',
    accent: '#ff5f9e',
    neutral: '#23282e',
  },
  {
    id: 14,
    theme: 'lofi',
    primary: '#0d0d0d',
    secondary: '#1a1919',
    accent: '#1a1919',
    neutral: '#f5f5f5',
  },
  {
    id: 15,
    theme: 'pastel',
    primary: '#d1c1d7',
    secondary: '#f8b4d9',
    accent: '#fde68a',
    neutral: '#f3f4f6',
  },
  {
    id: 16,
    theme: 'fantasy',
    primary: '#6e3ff5',
    secondary: '#f87272',
    accent: '#facc15',
    neutral: '#2a2e37',
  },
  {
    id: 17,
    theme: 'wireframe',
    primary: '#b8b8b8',
    secondary: '#b8b8b8',
    accent: '#b8b8b8',
    neutral: '#ebebeb',
  },
  {
    id: 18,
    theme: 'black',
    primary: '#000000',
    secondary: '#0f0f0f',
    accent: '#2f2f2f',
    neutral: '#212121',
  },
  {
    id: 19,
    theme: 'luxury',
    primary: '#ffffff',
    secondary: '#f9a8d4',
    accent: '#facc15',
    neutral: '#111111',
  },
  {
    id: 20,
    theme: 'dracula',
    primary: '#ff79c6',
    secondary: '#bd93f9',
    accent: '#8be9fd',
    neutral: '#282a36',
  },
  {
    id: 21,
    theme: 'cmyk',
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#ffff00',
    neutral: '#ffffff',
  },
  {
    id: 22,
    theme: 'autumn',
    primary: '#8c5326',
    secondary: '#db924b',
    accent: '#ffe5b4',
    neutral: '#2e1e12',
  },
  {
    id: 23,
    theme: 'business',
    primary: '#1c4e80',
    secondary: '#7c3aed',
    accent: '#facc15',
    neutral: '#111827',
  },
  {
    id: 24,
    theme: 'acid',
    primary: '#ff00ff',
    secondary: '#00ffff',
    accent: '#fffb00',
    neutral: '#1e1e1e',
  },
  {
    id: 25,
    theme: 'lemonade',
    primary: '#d4f1a1',
    secondary: '#f9a8d4',
    accent: '#fcd34d',
    neutral: '#fef9c3',
  },
  {
    id: 26,
    theme: 'night',
    primary: '#3b82f6',
    secondary: '#f59e0b',
    accent: '#10b981',
    neutral: '#1f2937',
  },
  {
    id: 27,
    theme: 'coffee',
    primary: '#c7a17a',
    secondary: '#6f4e37',
    accent: '#dab785',
    neutral: '#3e2723',
  },
  {
    id: 28,
    theme: 'winter',
    primary: '#1e3a8a',
    secondary: '#3b82f6',
    accent: '#e0f2fe',
    neutral: '#1e293b',
  },
];

const ThemeController = () => {
  const [, setTheme] = useAtom(persistentThemeAtom);
  const [openTheme, setOpenTheme] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

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