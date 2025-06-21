"use client";
import wallet from "../../assets/investment-score.svg";
import shield from "../../assets/security-score.svg";
import { montserrat, poppins } from "@/fonts/fonts";
import finWeak from "../../assets/financial-health-icon-weak.svg";
import finAverage from "../../assets/financial-health-icon-average.svg";
import finStrong from "../../assets/financial-health-icon-good.svg";

import Image from "next/image";
import img2 from "../../assets/dash-icon-bulb.svg";
import { useAtom } from "jotai";
import { emergencyFundAtom, financialAtom } from "@/atoms/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FinancialScore() {
  const [financials] = useAtom(financialAtom);
  const [emergencyFund] = useAtom(emergencyFundAtom);
  const [totalScore, setTotalScore] = useState(0);
  const [width, setWidth] = useState(0);

  const router = useRouter();



  // @ts-expect-error - TODO: fix this
  const savingScore = financials?.data?.savingScore || 0;
  //@ts-expect-error - TODO: fix this
  const emergencyScore = emergencyFund?.emergencyFundStatus?.score || 0;

  useEffect(() => {
    if (financials && emergencyFund) {
      const FinancialScore = savingScore;
      const emergencyFundScore = emergencyScore;
      setTotalScore(Math.round((FinancialScore + emergencyFundScore) / 2));
    } else {
     
      setTotalScore(Math.round((savingScore + emergencyScore) / 2));
    }
  }, [financials, emergencyFund, savingScore, emergencyScore]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(totalScore);
    }, 100);

    return () => clearTimeout(timer);
  }, [totalScore]);

  if (!financials || !emergencyFund) {
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

  const getStatusText = (score: number) => {
    if (score <= 30) return "Weak Score, High Impact";
    if (score > 30 && score < 70) return "Moderate Score, Medium Impact";
    return "Strong Score, Low Impact";
  };

  return (
    <div className="flex flex-col bg-accent text-accent-foreground shadow-lg rounded-[30px] p-5 gap-4">
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex flex-col mb-1">
          <div className="text-xl text-black font-semibold">
            <p className={`${montserrat}`}>Financial Checkup</p>
          </div>
          <div className="text-sm">
            <p className={`${montserrat}`}>Analyse & improve your Financial Health</p>
          </div>
        </div>
        <div className="flex border-2 gap-3 items-center w-full md:w-2/3 rounded-[15px] px-4 py-2">
          <div>
            {totalScore <= 30 && (
              <Image src={finWeak} alt="weak financials" />
            )}
            {totalScore > 30 && totalScore < 70 && (
              <Image src={finAverage} alt="average financials" />
            )}
            {totalScore >= 70 && (
              <Image src={finStrong} alt="strong financials" />
            )}
          </div>
          <div className="text-black text-4xl">
            <p className={`${montserrat} font-semibold`}>{totalScore}</p>
          </div>
          <div className={`${poppins}`}> 
            <div className="text-black text-[13px]">
              <p>Financial Health Score</p>
            </div>
            <div className="text-xs">
              <p>out of 100</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-1">
          <div className="text-black font-semibold">
            <p className={`${montserrat}`}>Your Financial Health Status</p>
          </div>
          <div className="text-xs">
            <p className={`${montserrat}`}>Refer to the Contributors for more details</p>
          </div>
        </div>
        <div className="bg-[#d4d4d4c3] w-full h-4 flex rounded-[15px] mt-1">
          <div
            style={{ width: `${width}%` }}
            className={`bg-[#ec0072] h-full rounded-[15px] transition-all duration-1000 ease-in-out`}
          ></div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-3 mt-2">
        <div>
          <div className="text-lg text-black font-semibold">
            <p className={`${montserrat}`}>Score Contributors</p>
          </div>
          <div className="text-xs">
            <p className={`${montserrat}`}>Components of your Financial Health Score</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full border-2 border-[#6F39C5] flex h-fit p-1">
            <Image src={wallet} alt="wallet" height={20} width={20} />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1">
              <div className={`${montserrat} font-semibold text-xs text-black`}>
                <p>Savings & Investments</p>
              </div>
              <div className="text-xs rounded-[10px] px-2 py-0.5 bg-black text-white">
                <p className={`${montserrat}`}> <span className="font-semibold">{savingScore}</span><span className="text-[#ffffffaa]">/100</span></p>
              </div>
            </div>
            <div className={`${montserrat} text-xs`}>
              <p>{getStatusText(savingScore)}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full border-2 border-[#4A9BE6] flex h-fit p-1">
            <Image src={shield} alt="shield" height={20} width={20} />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-1">
              <div className={`${montserrat} font-semibold text-xs text-black`}>
                <p>Financial Security</p>
              </div>
              <div className="text-xs rounded-[10px] px-2 py-0.5 bg-black text-white">
                <p className={`${montserrat}`}> <span className="font-semibold">{emergencyScore}</span><span className="text-[#ffffffaa]">/100</span></p>
              </div>
            </div>
            <div className={`${montserrat} text-xs`}>
              <p>{getStatusText(emergencyScore)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full border-t border-[#5a595947] pt-2 mt-2">
        <div className="flex gap-2 items-center">
          <Image src={img2} alt="icon" width={20} height={20} />
          <p className={`${poppins} text-xs m-0`}>
            <span className="font-semibold">Reminder!</span> Recheck your financial health regularly.
          </p>
        </div>
        <div className="flex justify-center items-center text-secondary cursor-pointer rounded-full bg-neutral hover:bg-neutral-200 transition px-3 py-1">
          <p className={`text-xs font-semibold ${poppins}`} onClick={() => router.push("/user/goals")}>Create Goals</p>
        </div>
      </div>
    </div>
  );
}