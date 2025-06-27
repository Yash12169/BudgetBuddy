"use client";
import Image from "next/image";
import { montserrat, poppins } from "@/fonts/fonts";
import RedBadge from "../ui/redBadge";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { financialAtom, userAtom } from "@/atoms/atoms";
import { useUser } from "@clerk/nextjs";
import YellowBadge from "../ui/yellowBadge";
import GreenBadge from "../ui/greenBadge";

const formatAmount = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return `₹ ${Math.round(amount/1000)}K`;
  if (amount < 10000000) return `₹ ${(amount/100000).toFixed(1)}L`;
  return `₹ ${(amount/10000000).toFixed(1)}Cr`;
};

const calculateFinancialHealth = (salary: number, totalExpenses: number): string => {
  if (salary === 0) return "weak";
  
  const savings = salary - totalExpenses;
  const savingsPercent = (savings / salary) * 100;
  
  if (savingsPercent >= 50) return "strong";
  if (savingsPercent >= 30) return "moderate";
  return "weak";
};

export default function StarterCard() {
  const userC = useUser();
  const [user] = useAtom(userAtom);
  const [userImg, setUserImg] = useState("");
  const [financials] = useAtom(financialAtom);

  useEffect(() => {
    if (userC.isLoaded) {
      setUserImg(userC.user?.imageUrl || "");
    }
  }, [userC.isLoaded, userC.user?.imageUrl]);

  // Show loading state while data is being fetched
  if (!user || !financials) {
    return (
      <div className="bg-neutral flex flex-col gap-3 w-full h-full px-4 py-4 md:px-6 md:py-6 text-neutral-content rounded-2xl max-w-sm mx-auto md:max-w-full border border-neutral-content/20">
        {/* Avatar and greeting skeleton */}
        <div className="flex flex-col text-center items-center gap-2 md:gap-3 flex-1 justify-center">
          <div className="rounded-full h-24 w-24 md:h-36 md:w-36 p-1 flex justify-center items-center border-4 border-purple-500 shadow-[0_0_10px_#A020F0] md:shadow-[0_0_15px_#A020F0]">
            <div className="skeleton w-full h-full rounded-full"></div>
          </div>
          <div className="text-neutral-content">
            <div className="skeleton h-5 w-32 md:w-40"></div>
          </div>
        </div>
      
        {/* Net worth and financial health skeleton */}
        <div className="flex justify-between mt-1">
          <div className="flex flex-col gap-0.5 md:gap-1">
            <div className="skeleton h-3 w-20 md:w-24"></div>
            <div className="skeleton h-4 w-16 md:w-20"></div>
          </div>
          <div className="flex flex-col gap-0.5 md:gap-1">
            <div className="skeleton h-3 w-24 md:w-28"></div>
            <div className="skeleton h-6 w-16 md:w-20 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  //@ts-expect-error - TODO: fix this
  const salary = financials?.allData?.salary || 0;
  //@ts-expect-error - TODO: fix this
  const expenses = financials?.allData?.expenses || 0;
  //@ts-expect-error - TODO: fix this
  const extraExpenses = financials?.allData?.extraExpenses || 0;
  //@ts-expect-error - TODO: fix this
  const insurancePremium = financials?.allData?.insurancePremium || 0;
  
  // Calculate basic net worth: salary - total expenses (as a simple approximation)
  const totalExpenses = expenses + extraExpenses + insurancePremium;
  const basicNetWorth = salary - totalExpenses;
  
  //@ts-expect-error - TODO: fix this
  const netWorth = financials?.allData?.netWorth || basicNetWorth || salary; // Use net worth if available, fallback to calculated net worth, then salary
  
  // Calculate financial health based on salary and expenses
  const savingStatus = calculateFinancialHealth(salary, totalExpenses);
  const firstName = userC.user?.firstName || "User";
  const imageUrl = userImg || "/default-avatar.svg";

  return (
    <div className="bg-neutral flex flex-col gap-3 w-full h-full px-4 py-4 md:px-6 md:py-6 text-neutral-content rounded-2xl max-w-sm mx-auto md:max-w-full border border-neutral-content/20">
     
      <div className="flex flex-col text-center items-center gap-2 md:gap-3 flex-1 justify-center">
        <div className="rounded-full h-24 w-24 p-1 flex justify-center items-center border-4 border-purple-500 shadow-[0_0_10px_#A020F0] md:h-36 md:w-36 md:p-2 md:shadow-[0_0_15px_#A020F0]">
          <Image
            src={imageUrl}
            draggable={false}
            width={144}
            height={144}
            alt="icon"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="text-neutral-content">
          <p className={`${montserrat} text-base md:text-lg`}>
            <span className="font-semibold">Hi</span>,
            <span className="text-neutral-content/70"> {firstName}</span>
          </p>
        </div>
      </div>
    
      <div className={`flex justify-between ${poppins} mt-1`}>
        <div className="flex flex-col gap-0.5 md:gap-1">
          <div className="text-xs md:text-sm text-neutral-content/80">
            <p>Your net Worth</p>
          </div>
          <div className="font-semibold text-base text-neutral-content md:text-lg">
            <p>{formatAmount(netWorth)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 md:gap-1">
          <div className="text-xs md:text-sm text-neutral-content/80">
            <p>Your financial Health</p>
          </div>
          <div>
            {savingStatus === "weak" && <RedBadge text="Weak" />}
            {savingStatus === "moderate" && <YellowBadge text="Moderate" />}
            {savingStatus === "strong" && <GreenBadge text="Strong" />}
          </div>
        </div>
      </div>
    </div>
  );
}