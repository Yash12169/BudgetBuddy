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
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleFinancialCheckup = () => {
    setIsNavigating(true);
    router.push("/user/financial-checkup");
  };


  //@ts-expect-error - TODO: fix this
  const savingScore = financials?.data?.savingScore || 0;
  //@ts-expect-error - TODO: fix this
  const emergencyScore = emergencyFund?.emergencyFundStatus?.score || 0;

  useEffect(() => {
    if (financials && emergencyFund) {
      const FinancialScore = savingScore;
      const emergencyFundScore = emergencyScore;
      setTotalScore(Math.round((FinancialScore + emergencyFundScore) / 2));
    } else {
      // Set fallback total score when data is not available
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
    <div className="flex flex-col bg-accent text-accent-foreground shadow-lg rounded-[30px] p-7 gap-7">
      <div className="flex w-[100%] h-[100%]">
        <div className="flex w-[65%] h-[100%] flex-col gap-5">
          <div className="flex flex-col">
            <div className="text-xl text-black font-semibold">
              <p className={`${montserrat}`}>Financial Checkup</p>
            </div>
            <div className="text-sm">
              <p className={`${montserrat}`}>
                Analyse & improve your Financial Health
              </p>
            </div>
          </div>

          <div className="flex border-2 gap-5 items-center w-[60%] rounded-[15px] px-5 py-2">
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
            <div className="text-black text-5xl">
              <p className={`${montserrat} font-semibold`}>{totalScore}</p>
            </div>
            <div className={`${poppins}`}>
              <div className="text-black text-[14px]">
                <p>Financial Health Score</p>
              </div>
              <div className="text-sm">
                <p>out of 100</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-black font-semibold">
              <p className={`${montserrat}`}>Your Financial Health Status</p>
            </div>
            <div className="text-xs">
              <p className={`${montserrat}`}>
                Refer to the Contributors for more details
              </p>
            </div>
          </div>

          <div className="bg-[#d4d4d4c3] w-[90%] h-[5vh] flex rounded-[15px]">
            <div
              style={{ width: `${width}%` }}
              className={`bg-[#ec0072] h-[100%] rounded-[15px] transition-all duration-1000 ease-in-out`}
            ></div>
          </div>
        </div>

        <div className={`flex w-[45%] flex-col h-[100%] justify-center gap-5`}>
          <div>
            <div className="text-lg text-black font-semibold">
              <p className={`${montserrat}`}>Score Contributors</p>
            </div>
            <div className="text-sm">
              <p className={`${montserrat}`}>
                Components of your Financial Health Score
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="rounded-full border-2 border-[#6F39C5] justify-center items-center flex h-fit p-2">
              <Image src={wallet} alt="wallet" height={24} width={24} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <div
                  className={`${montserrat} font-semibold text-sm text-black`}
                >
                  <p>Savings & Investments</p>
                </div>
                <div className="text-xs rounded-[15px] px-2 py-1 bg-black text-white">
                  <p className={`${montserrat}`}>
                    <span className="font-semibold">{savingScore}</span>
                    <span className="text-[#ffffffaa]">/100</span>
                  </p>
                </div>
              </div>
              <div className={`${montserrat} text-xs`}>
                <p>{getStatusText(savingScore)}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="rounded-full border-2 border-[#4A9BE6] justify-center items-center flex h-fit p-2">
              <Image src={shield} alt="shield" height={24} width={24} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <div
                  className={`${montserrat} font-semibold text-sm text-black`}
                >
                  <p>Financial Security</p>
                </div>
                <div className="text-xs rounded-[15px] px-2 py-1 bg-black text-white">
                  <p className={`${montserrat}`}>
                    <span className="font-semibold">{emergencyScore}</span>
                    <span className="text-[#ffffffaa]">/100</span>
                  </p>
                </div>
              </div>
              <div className={`${montserrat} text-xs`}>
                <p>{getStatusText(emergencyScore)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-[5vh] w-full justify-end items-end gap-7 border-t border-[#5a595947]">
        <div className="flex h-[90%] justify-between items-end w-full px-4">
          <div className="flex gap-3 items-center w-[80%] h-fit">
            <Image src={img2} alt="icon" />
            <p className={`${poppins} text-[13px] w-full`}>
              <span className="font-semibold">Reminder!</span> Recheck your
              financial health regularly to track improvements.
            </p>
          </div>
          <div
            onClick={handleFinancialCheckup}
            className="flex justify-center items-center text-secondary cursor-pointer w-[10%] h-[75%] rounded-full bg-neutral hover:bg-neutral/90 transition-all duration-300 relative overflow-hidden group"
          >
            <p
              className={`text-[12px] font-semibold ${poppins} transition-opacity duration-300 ${
                isNavigating ? "opacity-0" : "opacity-100"
              }`}
            >
              Financial Checkup
            </p>
            {isNavigating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}