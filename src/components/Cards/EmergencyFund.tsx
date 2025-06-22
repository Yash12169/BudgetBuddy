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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet, Shield, Calendar, AlertTriangle, CheckCircle2, Info } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

const formatAmount = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹ 0";
  if (amount < 100000) return `₹ ${Math.round(amount/1000)}K`;
  if (amount < 10000000) return `₹ ${(amount/100000).toFixed(1)}L`;
  return `₹ ${(amount/10000000).toFixed(1)}Cr`;
};

export default function EmergencyFund() {
  const [emergencyFund] = useAtom(emergencyFundAtom);
  const [financials] = useAtom(financialAtom);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleReCheck = () => {
    setIsNavigating(true);
    router.push("/user/financial-checkup/emergency-fund");
  };

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
  //@ts-expect-error - TODO: fix this
  const salary = financials?.allData?.salary || 0;
  //@ts-expect-error - TODO: fix this
  const emergencyFundAmount = emergencyFund?.emergencyFundAmount || 0;
  //@ts-expect-error - TODO: fix this
  const monthsCovered = emergencyFund?.emergencyFundStatus?.monthsCovered || 0;
  //@ts-expect-error - TODO: fix this
  const status = emergencyFund?.emergencyFundStatus?.status || "critical";
  //@ts-expect-error - TODO: fix this
  const recommendedMin = emergencyFund?.emergencyFundStatus?.recommendedMin || 3;
  //@ts-expect-error - TODO: fix this
  const recommendedIdeal = emergencyFund?.emergencyFundStatus?.recommendedIdeal || 6;

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
              <p>{formatAmount(salary)}</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Emergency Fund:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{emergencyFundAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className={`${poppins.className} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Months Covered:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{monthsCovered}</p>
            </div>
          </div>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Your Status:</p>
            </div>
            <div>
              {status === "critical" && (
                <RedBadge text="Critical" />
              )}
              {status === "danger" && (
                <RedBadge text="Danger" />
              )}
              {status === "warning" && (
                <YellowBadge text="Warning" />
              )}
              {status === "moderate" && (
                <YellowBadge text="Moderate" />
              )}
              {status === "secure" && (
                <GreenBadge text="Secure" />
              )}
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
                <p className={`${poppins.className} font-semibold text-sm`}>View</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
              <DialogHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
                <DialogTitle className={`${montserrat.className} text-xl flex items-center gap-3 text-gray-800 dark:text-gray-200`}>
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  Emergency Fund Breakdown
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-green-500 rounded-full"></div>
                    <div className="text-base font-semibold text-gray-700 dark:text-gray-300">Fund Details</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-gray-700 dark:text-gray-300`}>Monthly Salary</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-gray-900 dark:text-gray-100`}>₹{salary.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-gray-700 dark:text-gray-300`}>Emergency Fund</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-gray-900 dark:text-gray-100`}>₹{emergencyFundAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-blue-500 rounded-full"></div>
                    <div className="text-base font-semibold text-gray-700 dark:text-gray-300">Coverage & Status</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-blue-700 dark:text-blue-400`}>Months Covered</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-blue-800 dark:text-blue-200`}>{monthsCovered}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-blue-700 dark:text-blue-400`}>Status</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-blue-800 dark:text-blue-200`}>
                        {(() => {
                          if (status === "critical") return "Critical";
                          if (status === "danger") return "Danger";
                          if (status === "warning") return "Warning";
                          if (status === "moderate") return "Moderate";
                          if (status === "secure") return "Secure";
                          return status;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-purple-500 rounded-full"></div>
                    <div className="text-base font-semibold text-gray-700 dark:text-gray-300">Recommendations</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-purple-700 dark:text-purple-400`}>Minimum Coverage</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-purple-800 dark:text-purple-200`}>{recommendedMin} months</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-purple-700 dark:text-purple-400`}>Ideal Coverage</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-purple-800 dark:text-purple-200`}>{recommendedIdeal} months</span>
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
            <p className={`${poppins.className} font-semibold text-sm transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>Re-Check</p>
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