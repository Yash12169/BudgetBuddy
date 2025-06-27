"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { montserrat, poppins } from "@/fonts/fonts";
import goalTracker from "../../assets/dash-goal-tracker.svg";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    <div className="flex w-full h-fit flex-col bg-neutral text-neutral-content shadow-lg rounded-2xl p-7 gap-6 border border-neutral-content/20">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary/10">
          <Image src={goalTracker} height={40} width={40} alt="Goal Tracker"/>
        </div>
        <div className="flex flex-col">
          <div className="text-xl text-neutral-content font-semibold">
            <p className={montserrat}>Create a Goal</p>
          </div>
          <div className="text-sm text-neutral-content/70">
            <p className={montserrat}>Set a new financial goal to stay on track!</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={`${poppins} text-neutral-content font-semibold text-base`}>
              Goal Title <span className="text-error text-xl">*</span>
            </Label>
            <Input
              type="text"
              value={formValues.title}
              onChange={handleInputChange("title")}
              disabled={isLoading}
              className={`${montserrat} text-base border border-neutral-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3`}
              placeholder="Dream Home, New Car, etc."
            />
          </div>
          <div className="space-y-2">
            <Label className={`${poppins} text-neutral-content font-semibold text-base`}>
              Category <span className="text-error text-xl">*</span>
            </Label>
            <select
              value={formValues.category}
              onChange={handleInputChange("category")}
              disabled={isLoading}
              className={`${montserrat} text-base border border-neutral-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 w-full`}
            >
              <option value="">Select Category</option>
              <option value="realEstate">Real Estate</option>
              <option value="automobile">Automobile</option>
              <option value="education">Education</option>
              <option value="general">General</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className={`${poppins} text-neutral-content font-semibold text-base`}>
              Target Amount <span className="text-error text-xl">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-content/70">₹</span>
              <Input
                type="text"
                value={formValues.targetAmount}
                onChange={handleInputChange("targetAmount")}
                disabled={isLoading}
                className={`${montserrat} text-base border border-neutral-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 pl-8`}
                placeholder="Enter amount"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className={`${poppins} text-neutral-content font-semibold text-base`}>
              Years to Goal <span className="text-error text-xl">*</span>
            </Label>
            <Input
              type="text"
              value={formValues.yearsToGoal}
              onChange={handleInputChange("yearsToGoal")}
              disabled={isLoading}
              className={`${montserrat} text-base border border-neutral-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3`}
              placeholder="5"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <div></div>
        </div>
        <div className="flex flex-col gap-6 bg-base-300 p-6 rounded-[20px] border border-neutral-content/50">
          <div className="flex flex-col gap-2">
            <Label className={`${poppins} text-neutral-content/80`}>Goal Setting Tips</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neutral-content/70"></div>
                <p className={`${poppins} text-sm text-neutral-content/70`}>Be specific about your goal amount</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neutral-content/70"></div>
                <p className={`${poppins} text-sm text-neutral-content/70`}>Set realistic timeframes</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neutral-content/70"></div>
                <p className={`${poppins} text-sm text-neutral-content/70`}>Consider inflation and salary growth</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className={`${poppins} text-neutral-content/80`}>Motivation</Label>
            <p className={`${poppins} text-sm text-neutral-content/70`}>
              Setting clear, achievable goals is the first step towards financial success. Every great achievement starts with a plan!
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label className={`${poppins} text-neutral-content/80`}>Reminder</Label>
            <p className={`${poppins} text-sm text-neutral-content/70`}>
              Your current salary from your financial profile will be used for goal calculations. Please ensure your salary is up to date in your financial checkup section.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/user/goals")}
          variant="outline"
          disabled={isLoading}
          className={`border-neutral-content/20 text-neutral-content hover:bg-neutral-focus hover:text-neutral-content bg-transparent ${montserrat} font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-300`}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`bg-neutral-content text-neutral hover:bg-neutral-content/60 border-neutral-content ${montserrat} font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-300`}
        >
          {isLoading ? "Creating..." : "Create Goal"}
        </Button>
      </div>
    </div>
  );
}