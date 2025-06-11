"use client";
import Image from "next/image";
import siren from "../../assets/dash-emergency-tool.svg";
import { Montserrat, Poppins } from "next/font/google";
import { useState } from "react";
import { emergencyFundAtom, financialAtom } from "@/atoms/atoms";
import { useAtom } from "jotai";
import RedBadge from "../ui/redBadge";
import GreenBadge from "../ui/greenBadge";
import YellowBadge from "../ui/yellowBadge";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

type StatusDetails = {
  text: string;
  color: string;
};

export default function EmergencyFund() {
  const [emergencyFund] = useAtom(emergencyFundAtom);
  const [financials] = useAtom(financialAtom);
  const router = useRouter();

  if (!emergencyFund || !financials) {
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

  return (
    <div className="flex flex-col p-5 h-[45vh] justify-between text-black">
      <div className="flex flex-col items-center gap-5">
        <div className="p-3 rounded-full">
          <Image src={siren} height={40} width={40} alt="Emergency Fund"/>
        </div>
        <div className={`${montserrat.className} text-xl font-semibold`}>
          <p>Emergency Fund</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`${poppins.className} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Monthly Salary</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{financials.data.salary}</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Emergency Fund:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{emergencyFund.emergencyFundAmount}</p>
            </div>
          </div>
        </div>

        <div className={`${poppins.className} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Months Covered:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{emergencyFund.emergencyFundStatus.monthsCovered}</p>
            </div>
          </div>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Your Status:</p>
            </div>
            <div>
              {emergencyFund.emergencyFundStatus.status === "critical" && (
                <RedBadge text="Critical" />
              )}
              {emergencyFund.emergencyFundStatus.status === "danger" && (
                <RedBadge text="Danger" />
              )}
              {emergencyFund.emergencyFundStatus.status === "warning" && (
                <YellowBadge text="Warning" />
              )}
              {emergencyFund.emergencyFundStatus.status === "moderate" && (
                <YellowBadge text="Moderate" />
              )}
              {emergencyFund.emergencyFundStatus.status === "secure" && (
                <GreenBadge text="Secure" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-[#c9cac88b] rounded-full h-[1px] w-full"></div>
        <div className="flex justify-between">
          <div className="bg-black text-white rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center">
            <p className={`${poppins.className} font-semibold text-sm`}>View</p>
          </div>
          <div 
            onClick={() => router.push("/user/emergency-fund/edit")}
            className="flex justify-center items-center border-2 border-black hover:bg-black hover:text-white transition duration-300 text-black rounded-[30px] px-5 py-1 cursor-pointer"
          >
            <p className={`${poppins.className} font-semibold text-sm`}>
              Re-Check
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
