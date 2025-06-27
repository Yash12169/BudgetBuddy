"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import siren from "../../assets/dash-emergency-tool.svg";
import { montserrat, poppins } from "@/fonts/fonts";
import { emergencyFundAtom, financialAtom } from "@/atoms/atoms";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import RedBadge from "../ui/redBadge";
import GreenBadge from "../ui/greenBadge";
import YellowBadge from "../ui/yellowBadge";

const formatNumber = (value: string | number): string => {
  const str = value.toString().replace(/,/g, "");
  if (str === "" || isNaN(Number(str))) return "";
  const [whole, decimal] = str.split(".");
  const lastThree = whole.slice(-3);
  const other = whole.slice(0, -3);
  const formatted =
    other.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (other ? "," : "") +
    lastThree;
  return decimal ? `${formatted}.${decimal}` : formatted;
};

const parseNumber = (value: string): number => {
  const clean = value.replace(/,/g, "");
  return isNaN(Number(clean)) ? 0 : Number(clean);
};

export default function EmergencyFundEdit() {
  const router = useRouter();
  const [emergencyFund, setEmergencyFund] = useAtom(emergencyFundAtom);
  const [financials] = useAtom(financialAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const [formValues, setFormValues] = useState({
    emergencyFund: "",
  });

  const maxLimits = {
    emergencyFund: 100000000000,
  };

  useEffect(() => {
    if (emergencyFund) {
      setFormValues({
        //@ts-expect-error - TODO: fix this
        emergencyFund: formatNumber(emergencyFund.data.emergencyFund),
      });
    }
  }, [emergencyFund]);

  const handleInputChange = 
    (field: keyof typeof formValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/,/g, "");

      if (/^\d*\.?\d*$/.test(rawValue)) {
        const num = Number(rawValue);
        if (num > (maxLimits[field] || Infinity)) return;

        setFormValues((prev) => ({
          ...prev,
          [field]: formatNumber(num),
        }));
      }
    };

  const handleSubmit = async () => {
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        emergencyFund: parseNumber(formValues.emergencyFund),
      };
      
      await axios.put(`/api/emergency-fund/${user.id}`, payload);
      
      const response = await axios.get(`/api/emergency-fund/${user.id}`);
      
      setEmergencyFund(response.data);
      
      router.push("/user/financial-checkup");
    } catch (err) {
      console.error("Submit failed", err);
      setError("Failed to update information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!emergencyFund || !financials) {
    return (
      <div className="flex w-full h-fit flex-col bg-neutral text-neutral-content shadow-lg rounded-2xl p-7 gap-10 border border-neutral-content/20">
        <div className="flex items-center gap-4">
          <div className="skeleton w-16 h-16 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="skeleton h-6 w-40"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-10 w-full rounded-xl"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-10 w-full rounded-xl"></div>
            </div>
          </div>

          <div className="flex flex-col gap-6 bg-primary/5 p-6 rounded-2xl border border-neutral-content/20">
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-8 w-24"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-8 w-20"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-8 w-20"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="skeleton h-10 w-24 rounded-xl"></div>
          <div className="skeleton h-10 w-24 rounded-xl"></div>
        </div>
      </div>
    );
  }
  //@ts-expect-error - TODO: fix this
  const currentMonthsCovered = emergencyFund?.emergencyFundStatus?.monthsCovered || 0;
  //@ts-expect-error - TODO: fix this
  const recommendedMin = emergencyFund?.emergencyFundStatus?.recommendedMin || 3;
  //@ts-expect-error - TODO: fix this
  const recommendedIdeal = emergencyFund?.emergencyFundStatus?.recommendedIdeal || 6;
  //@ts-expect-error - TODO: fix this
  const status = emergencyFund?.emergencyFundStatus?.status || "critical";

  return (
    <div className="flex w-full h-fit flex-col bg-neutral text-neutral-content shadow-lg rounded-2xl p-7 gap-10 border border-neutral-content/20">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Image src={siren} height={40} width={40} alt="Emergency Fund"/>
        </div>
        <div className="flex flex-col">
          <div className="text-xl text-neutral-content font-semibold">
            <p className={montserrat}>Emergency Fund</p>
          </div>
          <div className="text-sm text-neutral-content/80">
            <p className={montserrat}>Update your emergency fund amount</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-neutral-content`}>
              Emergency Fund Amount <span className="text-error text-xl">*</span>
            </label>
            <div className="flex items-center gap-3">
              <p className="font-semibold text-lg text-neutral-content">₹</p>
              <input
                type="text"
                value={formValues.emergencyFund}
                onChange={handleInputChange("emergencyFund")}
                className={`bg-base-100 text-base-content rounded-xl px-3 py-2 ${montserrat} border-2 border-neutral-content/20 font-semibold focus:outline-none focus:border-primary transition-all duration-300 ease-in-out w-full`}
                disabled={isLoading}
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-neutral-content`}>Monthly Salary</label>
            <div className="flex items-center gap-3">
              <p className="font-semibold text-lg text-neutral-content">₹</p>
              <input
                type="text"
                value={formatNumber(
                  financials.allData.salary
                )}
                disabled
                className={`bg-neutral-focus text-neutral-content rounded-xl px-3 py-2 ${montserrat} border-2 border-neutral-content/30 font-semibold w-full`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-primary/5 p-6 rounded-2xl border border-neutral-content/20">
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-neutral-content`}>Current Coverage</label>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-base-content">
                {currentMonthsCovered} months
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

          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-neutral-content`}>Recommendations</label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning"></div>
                <p className={`${poppins} text-sm text-neutral-content`}>Minimum: {recommendedMin} months of expenses</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <p className={`${poppins} text-sm text-neutral-content`}>Ideal: {recommendedIdeal} months of expenses</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-neutral-content`}>Status Message</label>
            <p className={`${poppins} text-sm text-neutral-content/70`}>
              {/* @ts-expect-error - TODO: fix this */}
              {emergencyFund?.emergencyFundStatus?.message || "No status message available"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`btn btn-primary px-6 py-2 rounded-2xl transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <p className={`${montserrat} font-semibold`}>
            {isLoading ? "Updating..." : "Submit"}
          </p>
        </button>
        <button
          onClick={() => router.push("/user/financial-checkup")}
          disabled={isLoading}
          className={`btn btn-outline btn-primary px-5 py-2 rounded-2xl transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <p className={`${montserrat} font-semibold`}>Cancel</p>
        </button>
      </div>
    </div>
  );
} 