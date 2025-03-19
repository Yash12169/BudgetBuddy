"use client";
import { poppins } from "@/fonts/fonts";
export default function RedBadge({text}: {text: string}) {
  return (
    <div className="px-4 border-1 border-[#EC0072] py-1 bg-[#ec007229] block w-fit rounded-[15px]">
        <p className={`${poppins} text-[#EC0072] font-[500] `} >{text}</p>
    </div>
    
  )
}
