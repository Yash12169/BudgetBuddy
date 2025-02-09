"use client";
import Image from "next/image";
import img from "../../assets/level3risk.png";
import img2 from "../../assets/dash-icon-bulb.svg";

import YellowBadge from "../ui/yellowBadge";
import { montserrat, poppins } from "@/fonts/fonts";
export default function RiskProfile() {
  return (
    <div className="px-7 pt-7 flex flex-col bg-accent text-accent-foreground shadow-lg rounded-[30px] w-[40%] gap-7">
      <div className="h-[20%]">
        <div className={`${montserrat} font-[600] text-[20px]`}>
          <p>Risk Profile Summary</p>
        </div>
        <div className={`${poppins} text-[13px]`}>
          <p>A summary of your Investor Personality</p>
        </div>
      </div>
      <div className="flex flex-col h-[60%] gap-1">
        <div className="flex justify-center items-end h-[60%]">
          <Image src={img} alt="Risk Profile" />
        </div>
        <div className="flex justify-between h-[10%] text-[12px] px-[10em]">
          <p className={`${poppins}`}>Very Conservative</p>
          <p className={`${poppins}`}>Very Aggressive</p>
        </div>

        <div className="flex h-[20%]  justify-center items-center gap-4 mt-3">
          <p className={`${montserrat} font-[700] text-[13px] `}>
            Your Risk Profile:
          </p>
          <YellowBadge text="Moderate" />
        </div>
        <div className={`${poppins} h-[10%] text-[13px] flex justify-center py-1`}>
          <p>
            Seems like you can have a portfolio with similar allocation to
            equity & debt.
          </p>
        </div>
      </div>
      
      <div className=" flex flex-col h-[20%] w-[100%] justify-center items-center bg--100 gap-7  border-t-[1px] border-[#5a595947]">
        <div className="flex h-[90%] justify-between items-center w-[100%]">
          <div className="flex gap-3 items-center w-[80%] h-[100%]">
            <Image src={img2} alt="icon" />
            <p className={`${poppins} text-[13px] w-[80%]`}>
              <span className="font-semibold">Reminder!</span> Improve your net
              worth by investing & avoiding loans. Update it here.
            </p>
          </div>
          <div className="flex justify-center items-center text-secondary cursor-pointer w-[15%] h-[60%] rounded-full bg-neutral">
            <p className={`text-[12px] font-semibold ${poppins}`}>My Finance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
