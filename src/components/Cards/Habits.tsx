"use client";
import Image from "next/image";
import card from "../../assets/fincheckcard.svg";
import GreenBadge from "../ui/greenBadge";
import { montserrat, poppins } from "@/fonts/fonts";
import { useAtom } from "jotai";
import { financialAtom } from "@/atoms/atoms";
import YellowBadge from "../ui/yellowBadge";
import RedBadge from "../ui/redBadge";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formatAmount = (amount: number): string => {
  if (amount >= 10000000) { // 1 Crore
    const crores = amount / 10000000;
    return `₹ ${crores.toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 Lakh
    const lakhs = amount / 100000;
    return `₹ ${lakhs.toFixed(1)}L`;
  } else if (amount >= 1000) { // 1 Thousand
    const thousands = amount / 1000;
    return `₹ ${thousands.toFixed(1)}K`;
  }
  return `₹ ${amount.toLocaleString()}`;
};

export default function Habits() {
  const router = useRouter();
  const [financials] = useAtom(financialAtom);
  const [isNavigating, setIsNavigating] = useState(false);

  if (!financials) {
    return (
      <div className="flex gap-4 flex-col h-[100%] px-5 py-9 bg-neutral text-neutral-content rounded-[30px]">
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  const totalExpenses = (financials.allData.expenses || 0) + 
                       (financials.allData.extraExpenses || 0) + 
                       (financials.allData.insurancePremium || 0);
  const savings = financials.allData.salary - totalExpenses;
  const savingsPercent = parseFloat(((savings / financials.allData.salary) * 100).toFixed(2));

  const getSavingStatus = (savings: number): string => {
    if (savings >= 50) return "strong";
    if (savings >= 30) return "moderate";
    return "weak";
  };

  const savingStatus = getSavingStatus(savingsPercent);

  const handleReCheck = () => {
    setIsNavigating(true);
    router.push("/user/financial-checkup/spending-habits");
  };

  return (
    <div className="flex flex-col p-5 h-[45vh] justify-between text-black">
      <div className="flex flex-col items-center gap-5">
        <div className="p-4 rounded-full">
          <Image src={card} height={50} width={50} alt="Spending Habits"/>
        </div>
        <div className={`${montserrat} text-xl font-semibold`}>
          <p>Spending Habit</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Monthly Income:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{formatAmount(financials.allData.salary)}</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Expenses:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{formatAmount(totalExpenses)}</p>
            </div>
          </div>
        </div>

        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Savings:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{savingsPercent.toFixed(2)}%</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Habit:</p>
            </div>
            <div>
              {savingStatus === "strong" && (<GreenBadge text="Saver"/>)}
              {savingStatus === "moderate" && (<YellowBadge text="Balanced"/>)}
              {savingStatus === "weak" && (<RedBadge text="Spender"/>)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-[#c9cac88b] rounded-full h-[1px] w-full"></div>
        <div className="flex justify-between">
          <div className="bg-black text-white rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center">
            <p className={`${poppins} font-semibold text-sm`}>View</p>
          </div>
          <div 
            onClick={handleReCheck}
            className="flex justify-center items-center border-2 border-black hover:bg-black hover:text-white transition-all duration-300 text-black rounded-[30px] px-5 py-1 cursor-pointer relative overflow-hidden group"
          >
            <p className={`${poppins} font-semibold text-sm transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
              Re-Check
            </p>
            {isNavigating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}