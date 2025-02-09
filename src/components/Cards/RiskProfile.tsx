"use client";
import Image from "next/image";
import img from "../../assets/level3risk.png";
import YellowBadge from "../ui/yellowBadge";
import { montserrat, poppins } from "@/fonts/fonts";
export default function RiskProfile() {
  return (
    <div className="flex flex-col bg-accent text-accent-foreground shadow-lg w-fit rounded-[30px] px-7 py-7 gap-1" >
      <div>
        <div className={`${montserrat} font-[600] text-[20px]`}>
          <p>Risk Profile Summary</p>
        </div>
        <div className={`${poppins} text-[13px]`}>
          <p>A summary of your Investor Personality</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Image src={img} alt="Risk Profile" />
      </div>
      <div className="flex justify-between text-[13px] px-5">
        <p>Very Conservative</p>
        <p>Very Aggressive</p>
      </div>

      <div className="flex  justify-center items-center gap-4">
        <p className={`${montserrat} font-[700] text-[13px] `}>Your Risk Profile:</p>
        <YellowBadge text="Moderate"/>
        {/* <RedBadge text="Aggressive"/>
        <GreenBadge text="Conservative"/> */}
      </div>
      <div className={`${poppins} text-[13px]`}>
        <p>Seems like you can have a portfolio with similar allocation to equity & debt.</p>
      </div>
    </div>
  );
}
