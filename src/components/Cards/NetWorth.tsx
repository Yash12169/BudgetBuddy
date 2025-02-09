"use client";
import Image from "next/image";
import img from "../../assets/dash-icon-bulb.svg";
import YellowBadge from "../ui/yellowBadge";
import { montserrat, poppins } from "@/fonts/fonts";
export default function NetWorth() {
  return (
    <div className=" pt-7 pb-4  flex flex-col bg-accent text-accent-foreground shadow-lg w-[40%] rounded-[30px] justify-between">
      <div className=" px-7 h-[20%]">
        <div className={`${montserrat} font-[600] text-[20px]`}>
          <p>Net Worth</p>
        </div>
        <div className={`${poppins} text-[13px]`}>
          <p>A visualisation of your True Wealth</p>
        </div>
      </div>
      <div className="flex  w-[100%] h-[60%] justify-between px-0 ">
        <div className="flex flex-col  h-[100%] w-[60%] gap-5 justify-center">
          <div className="w-[100%] h-[20%] bg-[#6F39C5] rounded-r-full"></div>
          <div className="w-[100%] h-[20%] bg-gray-400 rounded-r-full"></div>
          <div className="w-[100%] h-[20%] bg-[#88d5c3e1] rounded-r-full border-dashed border-[3px] border-[#01D3A3]">
            <div className="h-[100%] w-[70%] bg-[#01D3A3] rounded-r-full"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4  px-10 h-[100%] w-[35%]">
          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#6F39C5] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Assets you own</p>
              <p>₹ 100K</p>
            </div>
          </div>

          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-gray-400 h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Loans to repay</p>
              <p>₹ 100K</p>
            </div>
          </div>

          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#01D3A3] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Net Worth</p>
              <p>₹ 100K</p>
            </div>
          </div>

          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#88d5c3e1] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Projected Net Worth</p>
              <p>₹ 100K</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-7 h-[10%] flex justify-center items-center">
        <div className="h-[1px] bg-[#0000002e] w-[100%]"></div>
      </div>
      <div className=" flex flex-col h-[10%] w-[100%] justify-end items-end bg-green-0 px-7">
        
        
        
        <div className="flex justify-between items-center w-[100%] h-[100%]">
          <div className="flex gap-3 items-center w-[100%] h-[100%]">
            <Image src={img} alt="icon" />
            <p className={`${poppins} text-[13px]`}>
              <span className="font-semibold">Reminder!</span> Improve your net
              worth by investing & avoiding loans. Update it here.
            </p>
          </div>
          <div className="flex justify-center items-center text-neutral-content w-[20%] h-[100%] rounded-full bg-neutral">
            <p className={`text-[12px] font-semibold ${poppins}`}>My Finance</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
