"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import goalTracker from "../../assets/dash-goal-tracker.svg";
import { montserrat, poppins } from "@/fonts/fonts";
import { financialAtom } from "@/atoms/atoms";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

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

export default function AddGoalCard() {
  const router = useRouter();
  const [financials] = useAtom(financialAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const [formValues, setFormValues] = useState({
    title: "",
    targetAmount: "",
    yearsToGoal: "",
    category: "",
  });

  const maxLimits = {
    targetAmount: 100000000000,
    yearsToGoal: 100,
  };

  const handleInputChange = (field: keyof typeof formValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (field === 'targetAmount') {
      const rawValue = value.replace(/,/g, "");
      
      if (/^\d*\.?\d*$/.test(rawValue)) {
        const num = Number(rawValue);
        if (num > maxLimits.targetAmount) return;
        
        setFormValues(prev => ({
          ...prev,
          [field]: formatNumber(num),
        }));
      }
    } else if (field === 'yearsToGoal') {
      const numValue = parseNumber(value);
      if (numValue > maxLimits.yearsToGoal) return;
      
      setFormValues(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    if (!formValues.title || !formValues.targetAmount || !formValues.yearsToGoal || !formValues.category) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const goalData = {
        userId: user?.id,
        title: formValues.title,
        targetAmount: parseNumber(formValues.targetAmount),
        yearsToGoal: parseNumber(formValues.yearsToGoal),
        category: formValues.category,
      };
      
      await axios.post('/api/goals', goalData);
      
      toast.success('Goal created successfully');
      router.push("/user/goals");
    } catch (err) {
      console.error("Submit failed", err);
      setError("Failed to create goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-fit flex-col bg-accent text-accent-foreground shadow-lg rounded-[30px] p-7 gap-10">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-[#6F39C5]/10">
          <Image src={goalTracker} height={40} width={40} alt="Goal Tracker"/>
        </div>
        <div className="flex flex-col">
          <div className="text-xl text-black font-semibold">
            <p className={montserrat}>Create a Goal</p>
          </div>
          <div className="text-sm text-gray-600">
            <p className={montserrat}>Set a new financial goal to stay on track!</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>
              Goal Title <span className="text-red-600 text-xl">*</span>
            </label>
            <input
              type="text"
              value={formValues.title}
              onChange={handleInputChange("title")}
              className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-full`}
              disabled={isLoading}
              placeholder="Dream Home, New Car, etc."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>
              Category <span className="text-red-600 text-xl">*</span>
            </label>
            <select
              value={formValues.category}
              onChange={handleInputChange("category")}
              className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-full`}
              disabled={isLoading}
            >
              <option value="">Select Category</option>
              <option value="realEstate">Real Estate</option>
              <option value="automobile">Automobile</option>
              <option value="education">Education</option>
              <option value="general">General</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>
              Target Amount <span className="text-red-600 text-xl">*</span>
            </label>
            <div className="flex items-center gap-3">
              <p className="font-semibold text-lg">₹</p>
              <input
                type="text"
                value={formValues.targetAmount}
                onChange={handleInputChange("targetAmount")}
                className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-full`}
                disabled={isLoading}
                placeholder="Enter amount"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>
              Years to Goal <span className="text-red-600 text-xl">*</span>
            </label>
            <input
              type="text"
              value={formValues.yearsToGoal}
              onChange={handleInputChange("yearsToGoal")}
              className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-full`}
              disabled={isLoading}
              placeholder="5"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <div></div>
        </div>
        <div className="flex flex-col gap-6 bg-[#6F39C5]/5 p-6 rounded-[20px]">
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>Goal Setting Tips</label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <p className={`${poppins} text-sm`}>Be specific about your goal amount</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <p className={`${poppins} text-sm`}>Set realistic timeframes</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <p className={`${poppins} text-sm`}>Consider inflation and salary growth</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>Motivation</label>
            <p className={`${poppins} text-sm text-gray-600`}>
              Setting clear, achievable goals is the first step towards financial success. Every great achievement starts with a plan!
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className={`${poppins} text-gray-700`}>Reminder</label>
            <p className={`${poppins} text-sm text-gray-600`}>
              Your current salary from your financial profile will be used for goal calculations. Please ensure your salary is up to date in your financial checkup section.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <button
          onClick={() => router.push("/user/goals")}
          disabled={isLoading}
          className={`flex justify-center items-center text-[#6F39C5] border-2 border-[#6F39C5] px-5 py-2 rounded-[25px] cursor-pointer hover:bg-[#6F39C5] hover:text-white transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <p className={`${montserrat} font-semibold`}>Cancel</p>
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`flex justify-center items-center bg-[#6F39C5] px-6 py-2 rounded-[25px] text-white cursor-pointer hover:bg-[#5a2fa0] transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <p className={`${montserrat} font-semibold`}>
            {isLoading ? "Creating..." : "Create Goal"}
          </p>
        </button>
      </div>
    </div>
  );
}