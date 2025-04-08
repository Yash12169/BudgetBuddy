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
export default function Habits() {
  const router = useRouter();
  const [financials] = useAtom(financialAtom)
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
  return (
    <div className="flex flex-col p-5 h-[45vh] justify-between text-black">

      <div className="flex flex-col items-center gap-5">
      <div className="p-4 rounded-full">
          <Image src={card} height={50} width={50} alt="Emergency Fund"/>
        </div>
        <div className={`${montserrat} text-xl font-semibold`}>
          <p>Spending Habit</p>
        </div>
        
      </div>

      <div className="flex justify-between">

        <div className={`${poppins} flex flex-col gap-5`}>
          <div  className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Monthly Income:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{financials.data.salary}</p>
            </div>
          </div>

          <div  className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Expenses:</p>
            </div>
            <div  className="font-semibold text-lg">
              <p>{financials.data.expenses}</p>
            </div>
          </div>
        </div>

        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Savings:</p>
            </div>
            <div  className="font-semibold text-lg">
              <p>{financials.data.savingsPercent}%</p>
            </div>
          </div>

          <div  className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Habit:</p>
            </div>
            <div>
              {financials.data.savingStatus === "strong" && (<GreenBadge text="Saver"/>)}
              {financials.data.savingStatus === "moderate" && (<YellowBadge text="Balanced"/>)}
              {financials.data.savingStatus === "weak" && (<RedBadge text="Spender"/>)}
            </div>
          </div>
        </div>

      </div>



      <div className="flex flex-col gap-5">
        <div className="bg-[#c9cac88b] rounded-full h-[1px] w-full"></div>
        <div className="flex justify-between">
            <div className="bg-black text-white rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center">
                <p className={`${[poppins]} font-semibold text-sm`}>View</p>
            </div>
            <div onClick={()=>router.push("/user/financial-checkup/spending-habits")} className="flex justify-center items-center border-2  border-black hover:bg-black hover:text-white transition duration-300 text-black rounded-[30px] px-5 py-1 cursor-pointer">
                <p className={`${poppins} font-semibold text-sm`}>Re-Check</p>
            </div>
        </div>
      </div>

    </div>
  );
}