"use client";
import Image from "next/image";
import img from "../../assets/dash-icon-bulb.svg";
import { montserrat, poppins } from "@/fonts/fonts";
import { useAtom } from "jotai";
import { financialAtom, debtAtom, emergencyFundAtom } from "@/atoms/atoms";
import { useRouter } from "next/navigation";

const formatAmount = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return "₹" + " " + `${Math.round(amount / 1000)}K`;
  if (amount < 10000000) return "₹" + " " + `${(amount / 100000).toFixed(2)}L`;
  return "₹" + " " + `${(amount / 10000000).toFixed(2)}Cr`;
};

export default function NetWorth() {
  const router = useRouter();
  const [financials] = useAtom(financialAtom);
  const [debt] = useAtom(debtAtom);
  const [emergencyFund] = useAtom(emergencyFundAtom);

  // Calculate net worth components
  const assets = (financials?.allData?.salary || 0) + (emergencyFund?.data?.emergencyFund || 0);
  const liabilities = debt?.data?.data?.loanAmount || 0;
  const netWorth = assets - liabilities;
  const projectedNetWorth = netWorth * 1.1; // Simple projection (10% growth)

  // Calculate percentages for visual representation
  const total = Math.max(assets + liabilities, 1);
  const assetsPercentage = (assets / total) * 100;
  const liabilitiesPercentage = (liabilities / total) * 100;
  const netWorthPercentage = Math.max(0, (netWorth / total) * 100);

  return (
    <div className="pt-7  flex flex-col bg-accent text-accent-foreground shadow-lg w-[100%] h-[100%] rounded-[30px] justify-between gap-7">
      <div className=" px-7 h-[20%]">
        <div className={`${montserrat} font-[600] text-[20px]`}>
          <p>Net Worth</p>
        </div>
        <div className={`${poppins} text-[13px]`}>
          <p>A visualisation of your True Wealth</p>
        </div>
      </div>
      <div className="flex  w-[100%] h-[64%] justify-between py-0 bg--500">
        <div className="flex flex-col  h-[100%] w-[60%] gap-5 justify-">
          <div 
            className="w-[100%] h-[25%] bg-[#6F39C5] rounded-r-full"
            style={{ width: `${assetsPercentage}%` }}
          ></div>
          <div 
            className="w-[100%] h-[25%] bg-gray-400 rounded-r-full"
            style={{ width: `${liabilitiesPercentage}%` }}
          ></div>
          <div className="w-[100%] h-[25%] bg-[#88d5c3e1] rounded-r-full border-dashed border-[3px] border-[#01D3A3]">
            <div 
              className="h-[100%] bg-[#01D3A3] rounded-r-full"
              style={{ width: `${netWorthPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col justify- gap-7  px-10 h-[100%] w-[35%]">
          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#6F39C5] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Assets you own</p>
              <p>{formatAmount(assets)}</p>
            </div>
          </div>

          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-gray-400 h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Loans to repay</p>
              <p>{formatAmount(liabilities)}</p>
            </div>
          </div>

          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#01D3A3] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Net Worth</p>
              <p>{formatAmount(netWorth)}</p>
            </div>
          </div>

          <div className={`flex gap-1 text-[12px] font-[400] ${poppins}`}>
            <div className="bg-[#88d5c3e1] h-[10px] w-[10px] rounded-full"></div>
            <div className="flex flex-col">
              <p>Projected Net Worth</p>
              <p>{formatAmount(projectedNetWorth)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-7 h-[16%] w-[100%] flex mt-">
        <div className=" flex flex-col h-[100%] w-[100%] justify-center items-center bg--100 gap-7  border-t-[1px] border-[#5a595947]">
          <div className="flex h-[90%] justify-between items-center w-[100%]">
            <div className="flex gap-3 items-center w-[80%] h-[100%]">
              <Image src={img} alt="icon" />
              <p className={`${poppins} text-[13px] w-[80%]`}>
                <span className="font-semibold">Reminder!</span> Improve your
                net worth by investing & avoiding loans. Update it here.
              </p>
            </div>
            <div 
              className="flex justify-center items-center text-secondary cursor-pointer w-[15%] h-[60%] rounded-full bg-neutral"
              onClick={() => router.push("/user/financial-checkup")}
            >
              <p className={`text-[12px] font-semibold ${poppins}`}>
                My Finance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
