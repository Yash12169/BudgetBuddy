"use client";

import { montserrat, poppins } from "@/fonts/fonts";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function Disclaimer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerClasses = mounted 
    ? "flex items-start gap-3 bg-neutral border border-neutral-content/20 rounded-xl px-4 py-3 shadow-sm"
    : "flex items-start gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 shadow-sm";

  const iconClasses = mounted 
    ? "mt-1 text-neutral-content"
    : "mt-1 text-neutral-content dark:text-blue-400";

  const titleClasses = mounted 
    ? `${montserrat} font-semibold text-base text-neutral-content mb-1`
    : `${montserrat} font-semibold text-base text-neutral-800 dark:text-neutral-100 mb-1`;

  const textClasses = mounted 
    ? `${poppins} text-xs text-neutral-content/70 leading-snug`
    : `${poppins} text-xs text-neutral-600 dark:text-neutral-300 leading-snug`;

  const linkClasses = mounted 
    ? "underline text-base-content   cursor-pointer font-medium"
    : "underline text-blue-600 dark:text-blue-400 cursor-pointer font-medium";

  return (
    <div className={containerClasses}>
      <div className={iconClasses}>
        <Info className="w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <div className={titleClasses}>Disclaimer</div>
        <div className={textClasses}>
          The risk profile used in this domain does not constitute a component of the Investment Advice process. The securities mentioned are for illustration purposes only and should not be considered as investment recommendations. Investments in the securities market are subject to various market risks, including volatility, liquidity, and economic factors. Past performance is not indicative of future results. Investors are advised to read all related documents carefully and conduct thorough due diligence before making any investment decisions. Seek professional financial advice if needed.{' '}
          <span className={linkClasses}>Learn more</span>
        </div>
      </div>
    </div>
  );
}


