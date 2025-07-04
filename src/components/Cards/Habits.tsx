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
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Wallet, 
  Receipt, 
  PlusCircle, 
  Shield, 
  TrendingUp, 
  PiggyBank, 
  Percent 
} from "lucide-react";

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

export default function Habits() {
  const router = useRouter();
  const [financials] = useAtom(financialAtom);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  if (!financials) {
    return (
      <div className="flex flex-col p-5 h-[45vh] justify-between bg-neutral text-neutral-content rounded-2xl border border-neutral-content/20">
        <div className="flex flex-col items-center gap-5">
          <div className="skeleton w-16 h-16 rounded-full"></div>
          <div className="skeleton h-6 w-32"></div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-6 w-20"></div>
            </div>
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-6 w-16"></div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-16"></div>
              <div className="skeleton h-6 w-12"></div>
            </div>
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-12"></div>
              <div className="skeleton h-6 w-16"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-neutral-content/20 rounded-full h-[1px] w-full"></div>
          <div className="flex justify-between">
            <div className="skeleton h-8 w-16 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const totalExpenses = (financials.allData.expenses || 0) + 
                       (financials.allData.extraExpenses || 0) + 
                       (financials.allData.insurancePremium || 0);
  const savings = financials.allData.salary - totalExpenses;
  const savingsPercent = parseFloat(((savings / financials.allData.salary) * 100).toFixed(2));

  const getSavingStatus = (savings: number): string => {
    if (savings >= 50) return "strong";
    if (savings >= 30) return "moderate";
    return "weak";
  };

  const savingStatus = getSavingStatus(savingsPercent);

  const handleReCheck = () => {
    setIsNavigating(true);
    router.push("/user/financial-checkup/spending-habits");
  };

  const handleView = () => {
    setIsViewOpen(true);
  };

  return (
    <div className="flex flex-col p-5 h-[45vh] justify-between bg-neutral text-neutral-content rounded-2xl border border-neutral-content/20">
      <div className="flex flex-col items-center gap-5">
        <div className="p-4 rounded-full bg-neutral-focus">
          <Image src={card} height={50} width={50} alt="Spending Habits"/>
        </div>
        <div className={`${montserrat} text-xl font-semibold text-neutral-content`}>
          <p>Spending Habit</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Monthly Income:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{formatAmount(financials.allData.salary)}</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Expenses:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{formatAmount(totalExpenses)}</p>
            </div>
          </div>
        </div>

        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Savings:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{savingsPercent.toFixed(2)}%</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Habit:</p>
            </div>
            <div>
              {savingStatus === "strong" && (<GreenBadge text="Saver"/>)}
              {savingStatus === "moderate" && (<YellowBadge text="Balanced"/>)}
              {savingStatus === "weak" && (<RedBadge text="Spender"/>)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-neutral-content/20 rounded-full h-[1px] w-full"></div>
        <div className="flex justify-between">


          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogTrigger asChild>
              <div 
                onClick={handleView}
                className="bg-neutral-content text-neutral rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center hover:bg-neutral-content/90 transition-all duration-300"
              >
                <p className={`${poppins} font-semibold text-sm`}>View</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border border-border rounded-2xl shadow-xl">
              <DialogHeader className="pb-4  border-b border-border">
                <DialogTitle className={`${montserrat} text-xl flex items-center gap-3 text-foreground`}>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  Spending Breakdown
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-primary rounded-full"></div>
                    <div className="text-base font-semibold ">Spending Details</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-focus border border-neutral-content/10 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-neutral-content/10 rounded-lg flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-primary-content/70" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-primary-content`}>Basic Expenses</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-primary-content`}>{formatAmount(financials.allData.expenses || 0)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-focus border border-neutral-content/10 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-neutral-content/10 rounded-lg flex items-center justify-center">
                          <PlusCircle className="w-5 h-5 text-primary-content/70" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-primary-content`}>Extra Expenses</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-primary-content`}>{formatAmount(financials.allData.extraExpenses || 0)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-focus border border-neutral-content/10 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-neutral-content/10 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-primary-content/70" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-primary-content`}>Insurance</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-primary-content`}>{formatAmount(financials.allData.insurancePremium || 0)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-purple-500 rounded-full"></div>
                    <div className="text-base font-semibold text-gray-700 dark:text-gray-300">Summary</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-purple-700 dark:text-purple-400`}>Total Expenses</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-purple-800 dark:text-purple-200`}>{formatAmount(totalExpenses)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-purple-700 dark:text-purple-400`}>Monthly Income</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-purple-800 dark:text-purple-200`}>{formatAmount(financials.allData.salary)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-green-500 rounded-full"></div>
                    <div className="text-base font-semibold text-gray-700 dark:text-gray-300">Savings</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <PiggyBank className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-green-700 dark:text-green-400`}>Monthly Savings</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-green-800 dark:text-green-300`}>{formatAmount(savings)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <Percent className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-green-700 dark:text-green-400`}>Savings Rate</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-green-800 dark:text-green-300`}>{savingsPercent.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-green-700 dark:text-green-400`}>Annual Increment Rate</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-green-800 dark:text-green-300`}>
                        {(financials.allData.annualIncrementRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>          
          <div 
            onClick={handleReCheck}
            className="flex justify-center items-center border-2 border-neutral-content hover:bg-neutral-content hover:text-neutral transition-all duration-300 text-neutral-content rounded-[30px] px-5 py-1 cursor-pointer relative overflow-hidden group"
          >
            <p className={`${poppins} font-semibold text-sm transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
              Re-Check
            </p>
            {isNavigating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute inset-0 bg-neutral-content opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}