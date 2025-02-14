"use client";
import Image from "next/image";
import img from "../../assets/dash-icon-bulb.svg";
import { montserrat, poppins } from "@/fonts/fonts";
import InvestmentChart from "../ui/investmentChart";
export default function Allocation() {
  return (
    <div className="pt-7  flex flex-col bg-accent text-accent-foreground shadow-lg w-[40%] rounded-[30px] justify-between gap-7">
      <div className=" px-7 h-[20%]">
        <div className={`${montserrat} font-[600] text-[20px]`}>
          <p>Allocation</p>
        </div>
        <div className={`${poppins} text-[13px]`}>
          <p>An outline of your Diversification</p>
        </div>
      </div>
      <div className="flex  w-[100%] h-[60%] justify-between py-0 bg--500">
        <div className="w-[65%] bg--600 flex justify-center">
            <InvestmentChart/>
        </div>
        <div className="flex flex-col justify-center gap-5  px-10 h-[100%] w-[35%]">
          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#6F39C5] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Stocks</p>
              <p>₹ 100K</p>
            </div>
          </div>

          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#8654CD] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Equity MF</p>
              <p>₹ 100K</p>
            </div>
          </div>

          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#9A6ED4] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Debt MF & FD</p>
              <p>₹ 100K</p>
            </div>
          </div>

          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#C0A4E3] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Gold</p>
              <p>₹ 100K</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-7 h-[20%] w-[100%] flex mt-">
        <div className=" flex flex-col h-[100%] w-[100%] justify-center items-center bg--100 gap-7  border-t-[1px] border-[#5a595947]">
          <div className="flex h-[90%] justify-between items-center w-[100%]">
            <div className="flex gap-3 items-center w-[80%] h-[100%]">
              <Image src={img} alt="icon" />
              <p className={`${poppins} text-[13px] w-[80%]`}>
                <span className="font-semibold">Reminder!</span> Improve your
                net worth by investing & avoiding loans. Update it here.
              </p>
            </div>
            <div className="flex justify-center items-center text-secondary cursor-pointer w-[15%] h-[60%] rounded-full bg-neutral">
              <p className={`text-[12px] font-semibold ${poppins}`}>
                My Finance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
