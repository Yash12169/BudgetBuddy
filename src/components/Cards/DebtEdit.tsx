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

export default function DebtEdit() {
  const router = useRouter();
  const [financials] = useAtom(financialAtom);
  const [debt] = useAtom(debtAtom);
  const [totalScore, setTotalScore] = useState(0);
  const user = useUser();

  const [formValues, setFormValues] = useState({
    loan: "",
    time: "",
    interest: "",
    emi: "",
    income: "",
    basic: "",
    extra: "",
    insurance: "",
  });

  const maxLimits = {
    loan: 100000000000,
    time: 100000000000,
    interest: 100000000000,
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
        time: formatNumber(debt.data.data.loanTenure),
        interest: formatNumber(debt.data.data.interestRate),
        emi: formatNumber(debt.data.data.emiAmount),
        income: formatNumber(financials.allData.salary || 0),
        basic: formatNumber(financials.allData.expenses || 0),
        extra: formatNumber(financials.allData.extraExpenses || 0),
        insurance: formatNumber(financials.allData.insurancePremium || 0),
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

  const totalExpenses =
    parseNumber(formValues.basic) +
    parseNumber(formValues.extra) +
    parseNumber(formValues.emi) +
    parseNumber(formValues.insurance);

  const totalIncome = parseNumber(formValues.income);
  const savings = totalIncome - totalExpenses;

  const handleSubmit = async () => {
    const userId = debt?.data?.data?.userId;
    if (!userId) {
      console.error("User ID not found in debt data");
      return;
    }

    const payload = {
      userId,
      loanAmount: parseNumber(formValues.loan),
      loanTenure: parseNumber(formValues.time),
      interestRate: parseFloat(formValues.interest),
      emiAmount: parseNumber(formValues.emi),
    };

    try {
      // Update debt information
      await axios.put("/api/debt/", payload);
      
      // Also update financials if needed
      const financialPayload = {
        userId,
        income: parseNumber(formValues.income),
        basic: parseNumber(formValues.basic),
        extra: parseNumber(formValues.extra),
        emi: parseNumber(formValues.emi),
        insurance: parseNumber(formValues.insurance),
      };
      
      await axios.put("/api/financials/", financialPayload);
      
      router.push("/user/financial-checkup");
    } catch (err) {
      console.error("Submit failed", err);
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
          <p className={montserrat}>Debt</p>
        </div>
        <div className="text-sm">
          <p className={montserrat}>Tell us about your outstanding loans</p>
        </div>
      </div>

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
          { label: "Loan Amount", key: "loan" },
          { label: "Loan Tenure", key: "time" },
          { label: "Interest Rate", key: "interest" },
          { label: "EMIs", key: "emi" },
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
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2 p-1">
          <label className={poppins}>Monthly Expenses</label>
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
        <div
          onClick={handleSubmit}
          className="flex justify-center items-center bg-[#6F39C5] px-6 py-2 rounded-[25px] text-white cursor-pointer"
        >
          <p className={`${montserrat} font-semibold`}>Submit</p>
        </div>
        <div
          onClick={() => router.push("/user/financial-checkup")}
          className="flex justify-center items-center text-[#6F39C5] border-2 border-[#6F39C5] px-5 py-2 rounded-[25px] cursor-pointer"
        >
          <p className={`${montserrat} font-semibold`}>Cancel</p>
        </div>
      </div>
    </div>
  );
}