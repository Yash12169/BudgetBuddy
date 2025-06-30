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

  const savingScore = financials?.data?.savingScore || 0;
  const emergencyScore = emergencyFund?.emergencyFundStatus?.score || 0;

  useEffect(() => {
    if (financials && emergencyFund) {
      const financialScore = savingScore;
      const emergencyFundScore = emergencyScore;
      setTotalScore(Math.round((financialScore + emergencyFundScore) / 2));
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
      <div className="flex flex-col bg-neutral text-neutral-content shadow-lg rounded-2xl p-7 gap-7 border border-neutral-content/20">
        <div className="flex w-[100%] h-[100%]">
          <div className="flex w-[65%] h-[100%] flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-40"></div>
              <div className="skeleton h-4 w-60"></div>
            </div>

            <div className="flex border-2 border-neutral-content/20 gap-5 items-center w-[60%] rounded-xl px-5 py-2 bg-neutral-focus">
              <div className="skeleton w-10 h-10 rounded-lg"></div>
              <div className="skeleton h-12 w-16"></div>
              <div className="flex flex-col gap-1">
                <div className="skeleton h-3 w-24"></div>
                <div className="skeleton h-3 w-16"></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="skeleton h-5 w-48"></div>
              <div className="skeleton h-3 w-56"></div>
            </div>

            <div className="bg-neutral-content/20 w-[90%] h-[5vh] flex rounded-xl">
              <div className="skeleton h-full w-1/3 rounded-xl"></div>
            </div>
          </div>

          <div className="flex w-[45%] flex-col h-[100%] justify-center gap-5">
            <div className="flex flex-col gap-2">
              <div className="skeleton h-5 w-32"></div>
              <div className="skeleton h-4 w-48"></div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="skeleton w-8 h-8 rounded-full"></div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex gap-2 items-center">
                  <div className="skeleton h-4 w-32"></div>
                  <div className="skeleton h-5 w-12 rounded-full"></div>
                </div>
                <div className="skeleton h-3 w-40"></div>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="skeleton w-8 h-8 rounded-full"></div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex gap-2 items-center">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-5 w-12 rounded-full"></div>
                </div>
                <div className="skeleton h-3 w-36"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-[5vh] w-full justify-end items-end gap-7 border-t border-neutral-content/20">
          <div className="flex h-[90%] justify-between items-end w-full px-4">
            <div className="flex gap-3 items-center w-[80%] h-fit">
              <div className="skeleton w-6 h-6"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="skeleton h-8 w-24 rounded-full"></div>
          </div>
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
    <div className="flex flex-col bg-neutral text-neutral-content shadow-lg rounded-2xl p-4 sm:p-6 gap-5 sm:gap-7 border border-neutral-content/20 box-border overflow-hidden">
      <div className="flex flex-col md:flex-row w-[100%] h-[100%]">
        <div className="flex w-full md:w-[65%] h-[100%] flex-col gap-5">
          <div className="flex flex-col">
            <div className="text-xl text-neutral-content font-semibold">
              <p className={montserrat}>Financial Checkup</p>
            </div>
            <div className="text-sm text-neutral-content/80">
              <p className={montserrat}>
                Analyse & improve your Financial Health
              </p>
            </div>
          </div>

          <div className="flex border-2 border-neutral-content/20 gap-5 items-center w-[60%] rounded-[15px] px-5 py-2 bg-neutral-focus">
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
            <div className="text-neutral-content text-5xl">
              <p className={`${montserrat} font-semibold`}>{totalScore}</p>
            </div>
            <div className={poppins}>
              <div className="text-neutral-content text-[14px]">
                <p>Financial Health Score</p>
              </div>
              <div className="text-sm text-neutral-content/70">
                <p>out of 100</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-neutral-content font-semibold">
              <p className={montserrat}>Your Financial Health Status</p>
            </div>
            <div className="text-xs text-neutral-content/70">
              <p className={montserrat}>
                Refer to the Contributors for more details
              </p>
            </div>
          </div>

          <div className="bg-neutral-content/20 w-[90%] h-[5vh] flex rounded-[15px]">
            <div
              style={{ width: `${width}%` }}
              className="bg-neutral-content h-[100%] rounded-[15px] transition-all duration-1000 ease-in-out"
            ></div>
          </div>
        </div>

        <div className="flex w-full md:w-[45%] flex-col h-[100%] justify-center gap-5">
          <div>
            <div className="text-lg text-neutral-content font-semibold">
              <p className={montserrat}>Score Contributors</p>
            </div>
            <div className="text-sm text-neutral-content/80">
              <p className={montserrat}>
                Components of your Financial Health Score
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="rounded-full border-2 border-base-content justify-center items-center flex h-fit p-2">
              <Image src={wallet} alt="wallet" height={24} width={24} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <div
                  className={`${montserrat} font-semibold text-sm text-neutral-content`}
                >
                  <p>Savings & Investments</p>
                </div>
                <div className="text-xs rounded-[15px] px-2 py-1 bg-neutral-content text-neutral">
                  <p className={montserrat}>
                    <span className="font-semibold">{savingScore}</span>
                    <span className="text-neutral/70">/100</span>
                  </p>
                </div>
              </div>
              <div className={`${montserrat} text-xs text-neutral-content/70`}>
                <p>{getStatusText(savingScore)}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="rounded-full border-2 border-secondary justify-center items-center flex h-fit p-2">
              <Image src={shield} alt="shield" height={24} width={24} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <div
                  className={`${montserrat} font-semibold text-sm text-neutral-content`}
                >
                  <p>Financial Security</p>
                </div>
                <div className="text-xs rounded-[15px] px-2 py-1 bg-neutral-content text-neutral">
                  <p className={montserrat}>
                    <span className="font-semibold">{emergencyScore}</span>
                    <span className="text-neutral/70">/100</span>
                  </p>
                </div>
              </div>
              <div className={`${montserrat} text-xs text-neutral-content/70`}>
                <p>{getStatusText(emergencyScore)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-3 pt-4 border-t border-neutral-content/20 mt-2">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2 px-0 sm:px-4">
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <Image src={img2} alt="icon" className="w-5 h-5 min-w-[20px] min-h-[20px]" />
            <p className={`${poppins} text-[13px] w-full text-neutral-content/80 whitespace-normal`}>
              <span className="font-semibold text-neutral-content">Reminder!</span> Recheck your financial health regularly to track improvements.
            </p>
          </div>
          <button
            onClick={handleFinancialCheckup}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm w-full sm:w-auto mt-2 sm:mt-0"
            disabled={isNavigating}
          >
            {isNavigating ? "Loading..." : "Financial Checkup"}
          </button>
        </div>
      </div>
    </div>
  );
}