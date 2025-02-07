"use client";

import { montserrat, poppins } from "@/fonts/fonts";

export default function Disclaimer() {
  return (
    <div className="flex flex-col bg-neutral px-5 py-5 text-neutral-content gap-2 rounded-lg  ">
        <div className={`${montserrat} font-[600] `}> 
            <p className="text-[20px]">Disclaimer</p>
        </div> 
        <div className={`${poppins} text-[14px] flex`}>
            <p>The risk profile used in this domain does not constitute a component of the Investment Advice process. The securities mentioned are for illustration purposes only and should not be considered as investment recommendations. Investments in the securities market are subject to various market risks, including volatility, liquidity, and economic factors. Past performance is not indicative of future results. Investors are advised to read all related documents carefully and conduct thorough due diligence before making any investment decisions. Seek professional financial advice if needed. <span className="underline cursor-pointer">Learn more</span></p>
        </div>
    </div>
  )
}
