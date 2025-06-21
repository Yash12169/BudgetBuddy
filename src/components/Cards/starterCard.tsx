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


  //@ts-expect-error - TODO: fix this
  const salary = financials?.salary || 0;
  //@ts-expect-error - TODO: fix this
  const savingStatus = financials?.savingStatus || "weak";
  const firstName = userC.user?.firstName || "User";
  const imageUrl = userImg || "/default-avatar.svg";

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black flex flex-col gap-4 w-full h-full px-4 py-4 md:px-5 md:py-5 text-neutral-content rounded-[30px] max-w-sm mx-auto md:max-w-full">
     
      <div className="flex flex-col text-center items-center gap-2 md:gap-4">
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
        <div className="text-white">
          <p className={`${montserrat} text-base md:text-lg`}>
            <span className="font-semibold">Hi</span>,
            <span className="text-gray-300"> {firstName}</span>
          </p>
        </div>
      </div>
    
      <div className={`flex justify-between ${poppins} mt-2`}>
        <div className="flex flex-col gap-0.5 md:gap-1">
          <div className="text-xs md:text-sm">
            <p>Your net Worth</p>
          </div>
          <div className="font-semibold text-base text-white md:text-lg">
            <p>{formatAmount(salary)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 md:gap-1">
          <div className="text-xs md:text-sm">
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