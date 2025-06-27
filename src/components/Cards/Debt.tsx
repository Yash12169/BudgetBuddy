"use client";
import Image from "next/image";
import card from "../../assets/dash-debt-tool.svg";
import GreenBadge from "../ui/greenBadge";
import { montserrat, poppins } from "@/fonts/fonts";
import { useState } from "react";
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
  if (amount >= 10000000) { 
    const crores = amount / 10000000;
    return `₹ ${crores.toFixed(1)}Cr`;
  } else if (amount >= 100000) { 
    const lakhs = amount / 100000;
    return `₹ ${lakhs.toFixed(1)}L`;
  } else if (amount >= 1000) { 
    const thousands = amount / 1000;
    return `₹ ${thousands.toFixed(1)}K`;
  }
  return `₹ ${amount.toLocaleString()}`;
};

export default function Debt() {
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
      <div className="flex flex-col p-5 h-[45vh] justify-between bg-neutral text-neutral-content rounded-2xl border border-neutral-content/20">
        <div className="flex flex-col items-center gap-5">
          <div className="skeleton w-16 h-16 rounded-full"></div>
          <div className="skeleton h-6 w-20"></div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-6 w-20"></div>
            </div>
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-6 w-24"></div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-6 w-12"></div>
            </div>
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-32"></div>
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
  return (
    <div className="flex flex-col p-5 h-[45vh] justify-between bg-neutral text-neutral-content rounded-2xl border border-neutral-content/20">
      <div className="flex flex-col items-center gap-5">
      <div className="p-3 rounded-full bg-neutral-focus">
          <Image src={card} height={40} width={40} alt="Emergency Fund"/>
        </div>
        <div className={`${montserrat} text-xl font-semibold text-neutral-content`}>
          <p>Debt</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Total Loans:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{formatAmount(debt.data.data.loanAmount)}</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Total EMI&apos;s:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{formatAmount(debt.data.data.emiAmount)}</p>
            </div>
          </div>
        </div>

        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>EMI Load:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{debt.data.debtLoad}%</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
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
        <div className="bg-neutral-content/20 rounded-full h-[1px] w-full"></div>
        <div className="flex justify-between">
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogTrigger asChild>
              <div
                onClick={() => setIsViewOpen(true)}
                className="bg-neutral-content text-neutral rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center hover:bg-neutral-content/90 transition-all duration-300"
              >
                <p className={`${poppins} font-semibold text-sm`}>View</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-neutral border border-neutral-content/20 rounded-2xl shadow-xl">
              <DialogHeader className="pb-4 border-b border-neutral-content/20">
                <DialogTitle className={`${montserrat} text-xl flex items-center gap-3 text-neutral-content`}>
                  <div className="p-2 bg-error/10 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-error" />
                  </div>
                  Debt Breakdown
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                {/* Loan Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-error rounded-full"></div>
                    <div className="text-base font-semibold text-neutral-content">Loan Details</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-focus border border-neutral-content/10 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-neutral-content/10 rounded-lg flex items-center justify-center">
                          <Banknote className="w-5 h-5 text-neutral-content/70" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-neutral-content`}>Loan Amount</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-neutral-content`}>{formatAmount(debt.data.data.loanAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-focus border border-neutral-content/10 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-neutral-content/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-neutral-content/70" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-neutral-content`}>Loan Tenure (yrs)</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-neutral-content`}>{debt.data.data.loanTenure}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-neutral-content">Interest Rate:</p>
                      <span className={`${poppins} text-lg font-semibold text-neutral-content`}>N/A</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-warning rounded-full"></div>
                    <div className="text-base font-semibold text-neutral-content">EMI & Risk</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-warning/10 border border-warning/20 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-warning/20 rounded-lg flex items-center justify-center">
                          <BadgeDollarSign className="w-5 h-5 text-warning" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-neutral-content`}>EMI Amount</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-neutral-content`}>{formatAmount(debt.data.data.emiAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-warning/10 border border-warning/20 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-warning/20 rounded-lg flex items-center justify-center">
                          <Percent className="w-5 h-5 text-warning" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-neutral-content`}>EMI Load</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-neutral-content`}>{debt.data.debtLoad}%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-warning/10 border border-warning/20 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-warning/20 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-warning" />
                        </span>
                        <span className={`${poppins} text-base font-medium text-neutral-content`}>Risk of Debt Trap</span>
                      </div>
                      <span className={`${poppins} text-lg font-semibold text-neutral-content`}>{debt.data.debtLoad <= 30 ? 'Low' : debt.data.debtLoad <= 50 ? 'Moderate' : 'High'}</span>
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
            <p className={`${poppins} font-semibold text-sm transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>Re-Check</p>
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
