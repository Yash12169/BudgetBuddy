"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { debtAtom, financialAtom } from "@/atoms/atoms";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { montserrat, poppins } from "@/fonts/fonts";
import Image from "next/image";
import finWeak from "../../assets/financial-health-icon-weak.svg";
import finAverage from "../../assets/financial-health-icon-average.svg";
import finStrong from "../../assets/financial-health-icon-good.svg";
import { useRouter } from "next/navigation";

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
  const [debt, setDebt] = useAtom(debtAtom);
  const [financials] = useAtom(financialAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    loan: "",
    tenure: "",
    emi: "",
  });

  const [originalValues, setOriginalValues] = useState({
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
    if (financials && debt) {
      const formattedValues = {
        loan: formatNumber(debt.data.data.loanAmount),
        tenure: formatNumber(debt.data.data.loanTenure),
        emi: formatNumber(debt.data.data.emiAmount),
      };
      setFormValues(formattedValues);
      setOriginalValues(formattedValues);
    }
  }, [financials, debt]);

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
      
      toast.success("Debt information updated successfully!");
      
      // Redirect to financial checkup page
      router.push("/user/financial-checkup");
    } catch (err) {
      console.error("Submit failed", err);
      setError("Failed to update information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    setFormValues(originalValues);
    setError(null);
    // Navigate back to financial checkup page
    router.push("/user/financial-checkup");
  };

  if (!financials || !debt) {
    return (
      <div className="flex w-full h-fit flex-col bg-neutral text-neutral-content shadow-lg rounded-2xl p-7 gap-10 border border-neutral-content/20">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-6 w-40"></div>
          <div className="skeleton h-4 w-64"></div>
        </div>

        <div className="flex border-2 border-neutral-content/20 gap-5 items-center w-[60%] rounded-2xl px-5 py-2 bg-neutral-focus">
          <div className="skeleton w-10 h-10 rounded-full"></div>
          <div className="skeleton h-12 w-16"></div>
          <div className="flex flex-col gap-1">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-3 w-16"></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div className="flex flex-col gap-2" key={i}>
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-10 w-32 rounded-xl"></div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <div className="skeleton h-10 w-24 rounded-xl"></div>
          <div className="skeleton h-10 w-24 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-fit flex-col bg-neutral text-neutral-content shadow-lg rounded-2xl p-7 gap-10 border border-neutral-content/20">
      <div className="flex flex-col">
        <div className="text-xl text-neutral-content font-semibold">
          <p className={montserrat}>Debt Management</p>
        </div>
        <div className="text-sm text-neutral-content/80">
          <p className={montserrat}>Update your loan and EMI details</p>
        </div>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex border-2 border-neutral-content/20 gap-5 items-center w-[60%] rounded-2xl px-5 py-2 bg-neutral-focus">
        <div>
          {debt.data.debtLoad <= 30 && <Image src={finWeak} alt="weak financials" width={40} height={40} />}
          {debt.data.debtLoad > 30 && debt.data.debtLoad < 70 && (
            <Image src={finAverage} alt="average financials" width={40} height={40} />
          )}
          {debt.data.debtLoad >= 70 && <Image src={finStrong} alt="strong financials" width={40} height={40} />}
        </div>
        <div className="text-neutral-content text-5xl">
          <p className={`${montserrat} font-semibold`}>{debt.data.debtLoad}</p>
        </div>
        <div className={`${poppins}`}>
          <div className="text-neutral-content text-[14px]">
            <p>Debt Score</p>
          </div>
          <div className="text-sm text-neutral-content/70">
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
            <label className={`${poppins} text-neutral-content`}>
              {item.label} <span className="text-error text-xl">*</span>
            </label>
            <div className="flex items-center gap-3">
              {item.showCurrency && <p className="font-semibold text-lg text-neutral-content">₹</p>}
              <input
                type="text"
                value={formValues[item.key as keyof typeof formValues]}
                onChange={handleInputChange(
                  item.key as keyof typeof formValues
                )}
                className={`bg-base-100 text-base-content rounded-xl px-3 py-2 ${montserrat} border-2 border-neutral-content/20 font-semibold focus:outline-none focus:border-primary transition-all duration-300 ease-in-out`}
                disabled={isLoading}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2 p-1">
          <label className={`${poppins} text-neutral-content`}>EMI Load</label>
          <div className="flex items-center gap-3">
           
            <input
              type="text"
              disabled
              value={`${debt.data.debtLoad}%`}
              className={`bg-neutral-focus text-neutral-content rounded-xl px-3 py-2 ${montserrat} border-2 border-neutral-content/30 font-semibold`}
            />
             <p className="font-semibold text-lg text-neutral-content">%</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-1">
          <label className={`${poppins} text-neutral-content`}>Risk Level</label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              disabled
              value={debt.data.debtLoad <= 30 ? 'Low' : debt.data.debtLoad <= 50 ? 'Moderate' : 'High'}
              className={`bg-neutral-focus text-neutral-content rounded-xl px-3 py-2 ${montserrat} border-2 border-neutral-content/30 font-semibold`}
            />
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
          onClick={handleCancel}
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