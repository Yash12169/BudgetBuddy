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
  const id = userC.user?.id;
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

  // Fallback values for database-fetched data
  const salary = financials?.data?.salary || 0;
  const savingStatus = financials?.data?.savingStatus || "weak";
  const firstName = userC.user?.firstName || "User";
  const imageUrl = userImg || "/default-avatar.svg";

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black flex gap-4 flex-col w-[100%] h-[100%] px-5 py-5 text-neutral-content rounded-[30px]">
      <div className="bg--500 flex flex-col text-center items-center gap-4">
        <div className="rounded-full h-36 p-2 w-36 flex justify-center border-4 border-purple-500 shadow-[0_0_15px_#A020F0]">
          <Image
            src={imageUrl}
            draggable={false}
            width={144}
            height={144}
            alt="icon"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-white">
          <p className={`${montserrat}`}>
            <span className="font-semibold text-lg">Hi</span>, 
            <span className="text-gray-300"> {firstName}</span>
          </p>
        </div>
      </div>
      <div className={`flex justify-between ${poppins}`}>
        <div className="flex flex-col gap-1">
          <div className="text-sm">
            <p>Your net Worth</p>
          </div>
          <div className="font-semibold text-lg text-white">
            <p>{formatAmount(salary)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm">
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