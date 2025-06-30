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
      <div className="flex flex-col p-5 h-[45vh] justify-between bg-neutral text-neutral-content rounded-2xl border border-neutral-content/20">
        <div className="flex flex-col items-center gap-5">
          <div className="skeleton w-16 h-16 rounded-full"></div>
          <div className="skeleton h-6 w-36"></div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-6 w-20"></div>
            </div>
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-6 w-24"></div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-6 w-16"></div>
            </div>
            <div className="gap-1 flex flex-col">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-6 w-20"></div>
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
  const salary = financials?.allData?.salary || 0;
  const emergencyFundAmount = emergencyFund?.emergencyFundAmount || 0;
  const monthsCovered = emergencyFund?.emergencyFundStatus?.monthsCovered || 0;
  const status = emergencyFund?.emergencyFundStatus?.status || "critical";
  const recommendedMin = emergencyFund?.emergencyFundStatus?.recommendedMin || 3;
  const recommendedIdeal = emergencyFund?.emergencyFundStatus?.recommendedIdeal || 6;

  return (
    <div className="flex flex-col p-5 h-[45vh] justify-between bg-neutral text-neutral-content rounded-2xl border border-neutral-content/20">
      <div className="flex flex-col items-center gap-5">
        <div className="p-3 rounded-full bg-neutral-focus">
          <Image src={siren} height={40} width={40} alt="Emergency Fund"/>
        </div>
        <div className={`${montserrat.className} text-xl font-semibold text-neutral-content`}>
          <p>Emergency Fund</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`${poppins.className} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Monthly Salary</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{formatAmount(salary)}</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Emergency Fund:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{emergencyFundAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className={`${poppins.className} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Months Covered:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{monthsCovered}</p>
            </div>
          </div>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
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
        <div className="bg-neutral-content/20 rounded-full h-[1px] w-full"></div>
        <div className="flex justify-between">
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogTrigger asChild>
              <div
                onClick={() => setIsViewOpen(true)}
                className="bg-neutral-content text-neutral rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center hover:bg-neutral-content/90 transition-all duration-300"
              >
                <p className={`${poppins.className} font-semibold text-sm`}>View</p>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border border-border rounded-2xl shadow-xl">
              <DialogHeader className="pb-4 border-b border-border">
                <DialogTitle className={`${montserrat.className} text-xl flex items-center gap-3 text-foreground`}>
                  <div className="p-2 bg-success/10 rounded-lg">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  Emergency Fund Breakdown
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-success rounded-full"></div>
                    <div className="text-base font-semibold text-foreground">Emergency Fund Details</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted border border-border gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-muted/10 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-muted-foreground" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-foreground`}>Emergency Fund</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-foreground`}>{emergencyFundAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-5 bg-primary rounded-full"></div>
                    <div className="text-base font-semibold text-foreground">Coverage & Status</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-foreground`}>Months Covered</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-foreground`}>{monthsCovered}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-primary/20 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-primary" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-foreground`}>Current Status</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-foreground`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-primary/20 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-foreground`}>Recommended Min</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-foreground`}>{recommendedMin} months</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Info className="w-5 h-5 text-primary" />
                        </span>
                        <span className={`${poppins.className} text-base font-medium text-foreground`}>Recommended Ideal</span>
                      </div>
                      <span className={`${poppins.className} text-lg font-semibold text-foreground`}>{recommendedIdeal} months</span>
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
            <p className={`${poppins.className} font-semibold text-sm transition-opacity duration-300 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>Re-Check</p>
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