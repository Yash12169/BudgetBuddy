"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import finWeak from "../../assets/financial-health-icon-weak.svg";
import finAverage from "../../assets/financial-health-icon-average.svg";
import finStrong from "../../assets/financial-health-icon-good.svg";
import { montserrat, poppins } from "@/fonts/fonts";
import { debtAtom, financialAtom } from "@/atoms/atoms";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

const parseNumber = (value: string | undefined): number => {
  if (!value) return 0;
  const clean = value.replace(/,/g, "");
  return isNaN(Number(clean)) ? 0 : Number(clean);
};

export default function DebtEdit() {
  const router = useRouter();
  const [financials, setFinancial] = useAtom(financialAtom);
  const [debt, setDebt] = useAtom(debtAtom);
  const [totalScore, setTotalScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const [formValues, setFormValues] = useState({
    loan: "",
    tenure: "",
    emi: "",
  });

  const maxLimits = {
    loan: 100000000000,
    tenure: 100000000000,
    emi: 100000000000,
  };

  useEffect(() => {
    router.refresh();
  }, [router]);

  useEffect(() => {
    if (financials && debt) {
      setTotalScore(debt.data.debtLoad <= 3 ? 80 : debt.data.debtLoad <= 5 ? 50 : 30);

      setFormValues({
        loan: formatNumber(debt.data.data.loanAmount),
        tenure: formatNumber(debt.data.data.loanTenure),
        emi: formatNumber(debt.data.data.emiAmount),
      });
    }
  }, [financials, debt, setTotalScore, setFormValues]);

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
      const debtPayload = {
        loanAmount: parseNumber(formValues.loan),
        loanTenure: parseNumber(formValues.tenure),
        emiAmount: parseNumber(formValues.emi),
      };

      await axios.put(`/api/debt/${user.id}`, debtPayload);
      
      // Refresh debt data
      const debtResponse = await axios.get(`/api/debt/${user.id}`);
      setDebt(debtResponse.data);
      
      router.push("/user/financial-checkup");
    } catch (err) {
      console.error("Submit failed", err);
      setError("Failed to update information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!financials || !debt) {
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
          <p className={montserrat}>Debt Management</p>
        </div>
        <div className="text-sm">
          <p className={montserrat}>Update your loan and EMI details</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex border-2 gap-5 items-center w-[60%] rounded-[15px] px-5 py-2">
        <div>
          {totalScore <= 30 && <Image src={finWeak} alt="weak financials" />}
          {totalScore > 30 && totalScore < 70 && (
            <Image src={finAverage} alt="average financials" />
          )}
          {totalScore >= 70 && <Image src={finStrong} alt="strong financials" />}
        </div>
        <div className="text-black text-5xl">
          <p className={`${montserrat} font-semibold`}>{totalScore}</p>
        </div>
        <div className={`${poppins}`}>
          <div className="text-black text-[14px]">
            <p>Debt Score</p>
          </div>
          <div className="text-sm">
            <p>out of 100</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        {[
          { label: "Loan Amount", key: "loan", showCurrency: true },
          { label: "Loan Tenure (years)", key: "tenure", showCurrency: false },
          { label: "EMI Amount", key: "emi", showCurrency: true },
        ].map((item) => (
          <div className="flex flex-col gap-2" key={item.key}>
            <label className={poppins}>
              {item.label} <span className="text-red-600 text-xl">*</span>
            </label>
            <div className="flex items-center gap-3">
              {item.showCurrency && <p className="font-semibold text-lg">₹</p>}
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

        <div className="flex flex-col gap-2 p-1">
          <label className={poppins}>EMI Load</label>
          <div className="flex items-center gap-3">
           
            <input
              type="text"
              disabled
              value={debt ? `${debt.data.debtLoad}%` : "0%"}
              className={`bg-[#c3c3c38e] rounded-[15px] px-3 py-2 ${montserrat} border-2 border-[#747373] font-semibold`}
            />
             <p className="font-semibold text-lg">%</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-1">
          <label className={poppins}>Risk Level</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              disabled
              value={debt ? (debt.data.debtLoad <= 30 ? 'Low' : debt.data.debtLoad <= 50 ? 'Moderate' : 'High') : 'Low'}
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