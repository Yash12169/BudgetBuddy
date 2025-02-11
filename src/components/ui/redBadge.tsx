"use client";
import { poppins } from "@/fonts/fonts";
export default function RedBadge({text}: {text: string}) {
  return (
    <div className="px-6 py-1 bg-red-200 block w-fit rounded-[15px]">
        <p className={`${poppins} text-red-800 font-[500]`} >{text}</p>
    </div>
  )
}
