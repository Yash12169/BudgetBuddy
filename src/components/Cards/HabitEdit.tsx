"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import finWeak from "../../assets/financial-health-icon-weak.svg";
import finAverage from "../../assets/financial-health-icon-average.svg";
import finStrong from "../../assets/financial-health-icon-good.svg";
import { montserrat, poppins } from "@/fonts/fonts";
import { financialAtom } from "@/atoms/atoms";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

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

export default function HabitEdit() {
  const router = useRouter();
  const [financials] = useAtom(financialAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const [formValues, setFormValues] = useState({
    income: "",
    netWorth: "",
    basic: "",
    extra: "",
    insurance: "",
    annualIncrementRate: "",
  });

  const maxLimits = {
    income: 100000000000,
    netWorth: 100000000000,
    basic: 100000000000,
    extra: 100000000000,
    insurance: 100000000000,
    annualIncrementRate: 100,
  };

  useEffect(() => {
    router.refresh();
  }, [router]);

  useEffect(() => {
    if (financials) {
      setFormValues({
        income: formatNumber(financials.allData.salary || 0),
        netWorth: formatNumber(financials.allData.netWorth || 0),
        basic: formatNumber(financials.allData.expenses || 0),
        extra: formatNumber(financials.allData.extraExpenses || 0),
        insurance: formatNumber(financials.allData.insurancePremium || 0),
        annualIncrementRate: financials.allData.annualIncrementRate ? (financials.allData.annualIncrementRate * 100).toFixed(1) : "5.0",
      });
    }
  }, [financials]);

  const handleInputChange = 
    (field: keyof typeof formValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/,/g, "");

      if (field === 'annualIncrementRate') {
        // Handle percentage input for annual increment rate
        if (/^\d*\.?\d*$/.test(rawValue)) {
          const num = Number(rawValue);
          if (num > (maxLimits[field] || Infinity)) return;

          setFormValues((prev) => ({
            ...prev,
            [field]: rawValue,
          }));
        }
      } else {
        // Handle regular number inputs
        if (/^\d*\.?\d*$/.test(rawValue)) {
          const num = Number(rawValue);
          if (num > (maxLimits[field] || Infinity)) return;

          setFormValues((prev) => ({
            ...prev,
            [field]: formatNumber(num),
          }));
        }
      }
    };

  const totalExpenses =
    parseNumber(formValues.basic) +
    parseNumber(formValues.extra) +
    parseNumber(formValues.insurance);

  const totalIncome = parseNumber(formValues.income);
  const savings = totalIncome - totalExpenses;

  const handleSubmit = async () => {
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        salary: parseNumber(formValues.income),
        netWorth: parseNumber(formValues.netWorth),
        expenses: parseNumber(formValues.basic),
        extraExpenses: parseNumber(formValues.extra),
        insurancePremium: parseNumber(formValues.insurance),
        annualIncrementRate: parseFloat(formValues.annualIncrementRate) / 100,
      };
      
      await axios.put(`/api/financials/${user.id}`, payload);
      
      router.push("/user/financial-checkup");
    } catch (err) {
      console.error("Submit failed", err);
      setError("Failed to update information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!financials) {
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

  return (
    <div className="flex w-full h-fit flex-col bg-accent text-accent-foreground shadow-lg rounded-[30px] p-7 gap-10">
      <div className="flex flex-col">
        <div className="text-xl text-black font-semibold">
          <p className={montserrat}>Spending Habits</p>
        </div>
        <div className="text-sm">
          <p className={montserrat}>Update your monthly income and expenses</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex border-2 gap-5 items-center w-[60%] rounded-[15px] px-5 py-2">
        <div>
          {financials.totalScore <= 30 && <Image src={finWeak} alt="weak financials" />}
          {financials.totalScore > 30 && financials.totalScore < 70 && (
            <Image src={finAverage} alt="average financials" />
          )}
          {financials.totalScore >= 70 && <Image src={finStrong} alt="strong financials" />}
        </div>
        <div className="text-black text-5xl">
          <p className={`${montserrat} font-semibold`}>{financials.totalScore}</p>
        </div>
        <div className={`${poppins}`}>
          <div className="text-black text-[14px]">
            <p>Saving Score</p>
          </div>
          <div className="text-sm">
            <p>out of 100</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        {[
          { label: "Monthly Income", key: "income" },
          { label: "Net Worth", key: "netWorth" },
          { label: "Basic Expenses", key: "basic" },
          { label: "Extra Expenses", key: "extra" },
          { label: "Insurance Premium", key: "insurance" },
        ].map((item) => (
          <div className="flex flex-col gap-2" key={item.key}>
            <label className={poppins}>
              {item.label} <span className="text-red-600 text-xl">*</span>
            </label>
            <div className="flex items-center gap-3">
              <p className="font-semibold text-lg">₹</p>
              <input
                type="text"
                value={formValues[item.key as keyof typeof formValues]}
                onChange={handleInputChange(
                  item.key as keyof typeof formValues
                )}
                className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out`}
                disabled={isLoading}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label className={poppins}>
            Annual Increment Rate <span className="text-red-600 text-xl">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={formValues.annualIncrementRate}
              onChange={handleInputChange("annualIncrementRate")}
              className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out`}
              disabled={isLoading}
              placeholder="5.0"
            />
            <p className="font-semibold text-lg">%</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-1">
          <label className={poppins}>Total Expenses</label>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-lg">₹</p>
            <input
              type="text"
              disabled
              value={formatNumber(totalExpenses)}
              className={`bg-[#c3c3c38e] rounded-[15px] px-3 py-2 ${montserrat} border-2 border-[#747373] font-semibold`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-1">
          <label className={poppins}>Monthly Savings</label>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-lg">₹</p>
            <input
              type="text"
              disabled
              value={formatNumber(savings)}
              className={`bg-[#c3c3c38e] rounded-[15px] px-3 py-2 ${montserrat} border-2 border-[#747373] font-semibold`}
            />
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