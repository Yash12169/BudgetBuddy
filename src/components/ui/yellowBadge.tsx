"use client";
import { poppins } from "@/fonts/fonts";
export default function YellowBadge({text}: {text: string}) {
  return (
    <div className="px-6 py-1 bg-yellow-200 block w-fit rounded-[15px] border border-yellow-800 ">
        <p className={`${poppins} text-yellow-800 font-[600] text-[13px]`} >{text}</p>
    </div>
  )
}
