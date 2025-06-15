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
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Banknote, Calendar, Percent, TrendingDown, AlertTriangle, BadgeDollarSign } from "lucide-react";

const formatAmount = (amount: number): string => {
  if (amount >= 10000000) { // 1 Crore
    const crores = amount / 10000000;
    return `₹ ${crores.toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 Lakh
    const lakhs = amount / 100000;
    return `₹ ${lakhs.toFixed(1)}L`;
  } else if (amount >= 1000) { // 1 Thousand
    const thousands = amount / 1000;
    return `₹ ${thousands.toFixed(1)}K`;
  }
  return `₹ ${amount.toLocaleString()}`;
};

export default function Debt() {
  const [salary, setSalary] = useState("");
  const [savings, setSavings] = useState("");
  const [expenses, setExpenses] = useState();
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const [debt] = useAtom(debtAtom);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleReCheck = () => {
    setIsNavigating(true);
    router.push("/user/financial-checkup/debt");
  };

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
              <p>{formatAmount(debt.data.data.loanAmount)}</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Total EMI's:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{formatAmount(debt.data.data.emiAmount)}</p>
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
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogTrigger asChild>
              <div
                onClick={() => setIsViewOpen(true)}
                className="bg-black text-white rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center hover:bg-black/90 transition-all duration-300"
              >
                <p className={`${poppins} font-semibold text-sm`}>View</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
              <DialogHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
                <DialogTitle className={`${montserrat} text-xl flex items-center gap-3 text-gray-800 dark:text-gray-200`}>
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  Debt Breakdown
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                {/* Loan Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-red-500 rounded-full"></div>
                    <div className="text-base font-semibold text-gray-700 dark:text-gray-300">Loan Details</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Banknote className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-gray-700 dark:text-gray-300`}>Loan Amount</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-gray-900 dark:text-gray-100`}>{formatAmount(debt.data.data.loanAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-gray-700 dark:text-gray-300`}>Loan Tenure (yrs)</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-gray-900 dark:text-gray-100`}>{debt.data.data.loanTenure}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Percent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-gray-700 dark:text-gray-300`}>Interest Rate</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-gray-900 dark:text-gray-100`}>{debt.data.data.interestRate}%</span>
                    </div>
                  </div>
                </div>
                {/* EMI & Risk */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-yellow-500 rounded-full"></div>
                    <div className="text-base font-semibold text-gray-700 dark:text-gray-300">EMI & Risk</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                          <BadgeDollarSign className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-yellow-700 dark:text-yellow-400`}>EMI Amount</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-yellow-800 dark:text-yellow-200`}>{formatAmount(debt.data.data.emiAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                          <Percent className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-yellow-700 dark:text-yellow-400`}>EMI Load</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-yellow-800 dark:text-yellow-200`}>{debt.data.debtLoad}%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-yellow-700 dark:text-yellow-400`}>Risk of Debt Trap</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-yellow-800 dark:text-yellow-200`}>{debt.data.debtLoad <= 30 ? 'Low' : debt.data.debtLoad <= 50 ? 'Moderate' : 'High'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <div
            onClick={handleReCheck}
            className="flex justify-center items-center border-2 border-black hover:bg-black hover:text-white transition-all duration-300 text-black rounded-[30px] px-5 py-1 cursor-pointer relative overflow-hidden group"
          >
            <p className={`${poppins} font-semibold text-sm transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>Re-Check</p>
            {isNavigating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
