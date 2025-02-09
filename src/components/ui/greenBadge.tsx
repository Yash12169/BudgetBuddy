"use client";
import { poppins } from "@/fonts/fonts";
export default function GreenBadge({text}: {text: string}) {
  return (
    <div className="px-6 py-1 bg-green-200 block w-fit rounded-[15px]">
        <p className={`${poppins} text-green-800 font-[500]`} >{text}</p>
    </div>
  )
}
