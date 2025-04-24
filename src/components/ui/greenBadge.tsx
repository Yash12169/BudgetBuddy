"use client";
import { poppins } from "@/fonts/fonts";
export default function GreenBadge({text}: {text: string}) {
  return (
    <div className="px-6 py-1 bg-green-200 block w-fit rounded-[15px] border border-green-800 ">
        <p className={`${poppins} text-green-800 font-[600] text-[13px]`} >{text}</p>
    </div>
  )
}
