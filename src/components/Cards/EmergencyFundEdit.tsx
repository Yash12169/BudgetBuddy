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
  const [financials, setFinancial] = useAtom(financialAtom);
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
      <div className="flex gap-4 flex-col h-fit px-5 py-9 bg-neutral text-neutral-content rounded-[30px]">
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }
  const currentMonthsCovered = emergencyFund.emergencyFundStatus.monthsCovered;
  const recommendedMin = emergencyFund.emergencyFundStatus.recommendedMin;
  const recommendedIdeal = emergencyFund.emergencyFundStatus.recommendedIdeal;

  return (
    <div className="flex w-full h-fit flex-col bg-accent text-accent-foreground shadow-lg rounded-[30px] p-7 gap-10">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-[#6F39C5]/10">
          <Image src={siren} height={40} width={40} alt="Emergency Fund"/>
        </div>
        <div className="flex flex-col">
          <div className="text-xl text-black font-semibold">
            <p className={montserrat}>Emergency Fund</p>
          </div>
          <div className="text-sm text-gray-600">
            <p className={montserrat}>Update your emergency fund amount</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>
              Emergency Fund Amount <span className="text-red-600 text-xl">*</span>
            </label>
            <div className="flex items-center gap-3">
              <p className="font-semibold text-lg">₹</p>
              <input
                type="text"
                value={formValues.emergencyFund}
                onChange={handleInputChange("emergencyFund")}
                className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-full`}
                disabled={isLoading}
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>Monthly Salary</label>
            <div className="flex items-center gap-3">
              <p className="font-semibold text-lg">₹</p>
              <input
                type="text"
                value={formatNumber(
                  financials.allData.salary
                )}
                disabled
                className={`bg-[#c3c3c38e] rounded-[15px] px-3 py-2 ${montserrat} border-2 border-[#747373] font-semibold w-full`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-[#6F39C5]/5 p-6 rounded-[20px]">
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>Current Coverage</label>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-[#6F39C5]">
                {currentMonthsCovered} months
              </div>
              <div>
                {emergencyFund.emergencyFundStatus.status === "critical" && (
                  <RedBadge text="Critical" />
                )}
                {emergencyFund.emergencyFundStatus.status === "danger" && (
                  <RedBadge text="Danger" />
                )}
                {emergencyFund.emergencyFundStatus.status === "warning" && (
                  <YellowBadge text="Warning" />
                )}
                {emergencyFund.emergencyFundStatus.status === "moderate" && (
                  <YellowBadge text="Moderate" />
                )}
                {emergencyFund.emergencyFundStatus.status === "secure" && (
                  <GreenBadge text="Secure" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>Recommendations</label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <p className={`${poppins} text-sm`}>Minimum: {recommendedMin} months of expenses</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className={`${poppins} text-sm`}>Ideal: {recommendedIdeal} months of expenses</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>Status Message</label>
            <p className={`${poppins} text-sm text-gray-600`}>
              {emergencyFund.emergencyFundStatus.message}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`flex justify-center items-center bg-[#6F39C5] px-6 py-2 rounded-[25px] text-white cursor-pointer hover:bg-[#5a2fa0] transition-all duration-300 ${
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
          className={`flex justify-center items-center text-[#6F39C5] border-2 border-[#6F39C5] px-5 py-2 rounded-[25px] cursor-pointer hover:bg-[#6F39C5] hover:text-white transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <p className={`${montserrat} font-semibold`}>Cancel</p>
        </button>
      </div>
    </div>
  );
} 