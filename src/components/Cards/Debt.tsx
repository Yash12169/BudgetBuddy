"use client";
import Image from "next/image";
import card from "../../assets/dash-debt-tool.svg";
import GreenBadge from "../ui/greenBadge";
import { montserrat, poppins } from "@/fonts/fonts";
import axios from "axios";
import { useActionState, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { debtAtom } from "@/atoms/atoms";
import YellowBadge from "../ui/yellowBadge";
import RedBadge from "../ui/redBadge";
export default function Debt() {
  const [salary, setSalary] = useState("");
  const [savings, setSavings] = useState("");
  const [expenses, setExpenses] = useState();
  const [debt] = useAtom(debtAtom);
  if (!debt) {
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
          <Image src={card} height={40} width={40} alt="Emergency Fund"/>
        </div>
        <div className={`${montserrat} text-xl font-semibold`}>
          <p>Debt</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Total Loans:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{debt.loanAmount}</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Total EMI's:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{debt.emiAmount}</p>
            </div>
          </div>
        </div>

        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>EMI Load:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{debt.data.debtLoad}%</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Risk of Debt Trap:</p>
            </div>
            <div>
              {debt.data.debtLoad <= 30 && (<GreenBadge text="Low"/>)}
              {debt.data.debtLoad > 30 && debt.data.debtLoad<=50 && (<YellowBadge text="Moderate"/>)}
              {debt.data.debtLoad > 50 && (<RedBadge text="High"/>)}
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
          <div className="flex justify-center items-center border-2  border-black hover:bg-black hover:text-white transition duration-300 text-black rounded-[30px] px-5 py-1 cursor-pointer">
            <p className={`${poppins} font-semibold text-sm`}>Re-Check</p>
          </div>
        </div>
      </div>
    </div>
  );
}
