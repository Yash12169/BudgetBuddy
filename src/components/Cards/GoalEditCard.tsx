"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import finWeak from "../../assets/financial-health-icon-weak.svg";
import finAverage from "../../assets/financial-health-icon-average.svg";
import finStrong from "../../assets/financial-health-icon-good.svg";
import { montserrat, poppins } from "@/fonts/fonts";
import { goalAtom, financialAtom } from "@/atoms/atoms";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

const categories = [
  "Education",
  "Retirement",
  "Home",
  "Vehicle",
  "Travel",
  "Wedding",
  "Business",
  "Other"
];

const sampleGoals = [
  {
    id: "sample-1",
    title: "Buy a Home",
    targetAmount: 5000000,
    adjustedTargetAmount: 5000000,
    amountRequired: 41667,
    yearsToGoal: 10,
    category: "Home",
    currentSalary: 1200000,
    annualIncrementRate: 8,
    forecastedSalary: 2590874,
    isAchievable: true,
    priority: 1
  },
  {
    id: "sample-2",
    title: "Child's Education",
    targetAmount: 3000000,
    adjustedTargetAmount: 3000000,
    amountRequired: 25000,
    yearsToGoal: 10,
    category: "Education",
    currentSalary: 1000000,
    annualIncrementRate: 5,
    forecastedSalary: 1628895,
    isAchievable: true,
    priority: 2
  },
  {
    id: "sample-3",
    title: "World Tour",
    targetAmount: 1500000,
    adjustedTargetAmount: 1500000,
    amountRequired: 41667,
    yearsToGoal: 3,
    category: "Travel",
    currentSalary: 800000,
    annualIncrementRate: 4,
    forecastedSalary: 899769,
    isAchievable: false,
    priority: 3
  }
];

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  yearsToGoal: number;
  category: string;
  isAchievable?: boolean;
}

export default function GoalEditCard({ goal }: { goal: Goal }) {
  const router = useRouter();
  const { user } = useUser();
  const [goalData] = useAtom(goalAtom);
  const [financialData] = useAtom(financialAtom);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    title: goal.title || "",
    targetAmount: formatNumber(goal.targetAmount || 0),
    yearsToGoal: goal.yearsToGoal?.toString() || "",
    category: goal.category || "",
  });

  const [isAchievable, setIsAchievable] = useState(goalData?.isAchievable || false);
  const [achievabilityScore, setAchievabilityScore] = useState(0);

  useEffect(() => {
    if (goalData) {
      setFormValues({
        title: goalData.title || "",
        targetAmount: formatNumber(goalData.targetAmount || 0),
        yearsToGoal: goalData.yearsToGoal?.toString() || "",
        category: goalData.category || "",
      });
    } 
    else if (financialData?.income) {
      setFormValues(prev => ({
        ...prev,
        currentSalary: financialData.income
      }));
    }
  }, [goalData, financialData, setFormValues]);

  useEffect(() => {
    const calculateAchievability = () => {
      if (!financialData?.income || !financialData?.annualIncrementRate) return;
      
      const inflationRate = inflationRates[formValues.category as keyof typeof inflationRates] || inflationRates.general;
      const adjustedTargetAmount = formValues.targetAmount * Math.pow(1 + inflationRate, formValues.yearsToGoal);
      const forecastedSalary = financialData.income * Math.pow(1 + financialData.annualIncrementRate, formValues.yearsToGoal);
      const isAchievable = forecastedSalary * 0.3 * formValues.yearsToGoal >= adjustedTargetAmount;
      
      setIsAchievable(isAchievable);
      setAchievabilityScore(isAchievable ? 85 : 45);
    };

    calculateAchievability();
  }, [formValues, setAchievabilityScore, financialData?.income, financialData?.annualIncrementRate]);

  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (key === 'targetAmount' || key === 'yearsToGoal' || key === 'currentSalary') {
      // Only allow numbers
      value = value.replace(/[^\d.]/g, '');
      value = parseFloat(value) || 0;
    }
    setFormValues((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues((prev) => ({
      ...prev,
      category: e.target.value
    }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues((prev) => ({
      ...prev,
      priority: parseInt(e.target.value)
    }));
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    setIsLoading(true);
    try {
      const updateData = {
        ...(goalData || {}),
        ...formValues,
        isAchievable: isAchievable,
        userId: user?.id
      };

      await axios.put(`/api/goals/${goalData?.id}`, updateData);
      toast.success("Goal updated successfully!");
      router.push("/user/goals");
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleGoal = (sample: Goal) => {
    setFormValues({
      title: sample.title,
      targetAmount: formatNumber(sample.targetAmount),
      yearsToGoal: sample.yearsToGoal?.toString() || "",
      category: sample.category || "",
    });
  };

  return (
    <div className="flex w-full h-fit flex-col bg-accent text-accent-foreground shadow-lg rounded-[30px] p-7 gap-10">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <div className="text-xl text-black font-semibold">
            <p className={montserrat}>Life Goal</p>
          </div>
          <div className="text-sm">
            <p className={montserrat}>Edit your financial goal details here</p>
          </div>
        </div>
        <div 
          className="text-sm text-[#6F39C5] cursor-pointer hover:underline"
          onClick={() => setShowSampleGoals(!showSampleGoals)}
        >
          <p className={montserrat}>{showSampleGoals ? "Hide" : "Show"} Sample Goals</p>
        </div>
      </div>

      {showSampleGoals && (
        <div className="flex flex-col gap-4 border-2 rounded-[20px] p-4">
          <div className="text-lg font-medium">
            <p className={montserrat}>Sample Goals</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {sampleGoals.map((sample) => (
              <div 
                key={sample.id}
                className="flex flex-col p-4 border-2 rounded-[15px] cursor-pointer hover:border-[#6F39C5] transition-all duration-200"
                onClick={() => loadSampleGoal(sample)}
              >
                <div className="text-md font-medium">{sample.title}</div>
                <div className="text-sm">₹{formatNumber(sample.targetAmount)} • {sample.yearsToGoal} years</div>
                <div className="text-sm mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sample.priority === 1 ? "bg-red-100 text-red-800" : 
                    sample.priority === 2 ? "bg-yellow-100 text-yellow-800" : 
                    "bg-green-100 text-green-800"
                  }`}>
                    {sample.priority === 1 ? "High" : sample.priority === 2 ? "Medium" : "Low"} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex border-2 gap-5 items-center w-[60%] rounded-[15px] px-5 py-2">
        <div>
          {achievabilityScore <= 30 && <Image src={finWeak} alt="difficult goal" />}
          {achievabilityScore > 30 && achievabilityScore < 70 && (
            <Image src={finAverage} alt="moderate goal" />
          )}
          {achievabilityScore >= 70 && <Image src={finStrong} alt="achievable goal" />}
        </div>
        <div className="text-black text-5xl">
          <p className={`${montserrat} font-semibold`}>{achievabilityScore}</p>
        </div>
        <div className={`${poppins}`}>
          <div className="text-black text-[14px]">
            <p>Achievability Score</p>
          </div>
          <div className="text-sm">
            <p>out of 100</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="flex flex-col gap-2">
          <label className={poppins}>
            Goal Title <span className="text-red-600 text-xl">*</span>
          </label>
          <input
            type="text"
            value={formValues.title}
            onChange={handleInputChange("title")}
            className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-64`}
            placeholder="Name your goal"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className={poppins}>
            Category <span className="text-red-600 text-xl">*</span>
          </label>
          <select
            value={formValues.category}
            onChange={handleCategoryChange}
            className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-48`}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className={poppins}>
            Priority <span className="text-red-600 text-xl">*</span>
          </label>
          <select
            value={formValues.priority}
            onChange={handlePriorityChange}
            className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-48`}
          >
            <option value={1}>High</option>
            <option value={2}>Medium</option>
            <option value={3}>Low</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className={`${poppins} text-gray-700`}>Target Amount</label>
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
          <label className={poppins}>
            Years to Achieve <span className="text-red-600 text-xl">*</span>
          </label>
          <input
            type="number"
            value={formValues.yearsToGoal}
            onChange={handleInputChange("yearsToGoal")}
            min="1"
            max="50"
            className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-32`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={poppins}>
            Current Annual Salary <span className="text-red-600 text-xl">*</span>
          </label>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-lg">₹</p>
            <input
              type="number"
              value={financialData?.income || 0}
              onChange={handleInputChange("currentSalary")}
              className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-48`}
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className={poppins}>
            Annual Increment Rate <span className="text-gray-500 text-sm">(from your financial profile)</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={financialData?.annualIncrementRate ? (financialData.annualIncrementRate * 100).toFixed(1) : "5.0"}
              disabled
              className={`bg-[#c3c3c38e] rounded-[15px] px-3 py-2 ${montserrat} border-2 border-[#747373] font-semibold w-32`}
            />
            <p className="font-semibold text-lg">%</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-1">
          <label className={poppins}>Forecasted Salary</label>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-lg">₹</p>
            <input
              type="text"
              disabled
              value={formatNumber(Math.round(financialData?.income && financialData?.annualIncrementRate ? 
                financialData.income * Math.pow(1 + financialData.annualIncrementRate, formValues.yearsToGoal) : 0))}
              className={`bg-[#c3c3c38e] rounded-[15px] px-3 py-2 ${montserrat} border-2 border-[#747373] font-semibold w-48`}
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2 p-1">
          <label className={poppins}>Monthly Savings Required</label>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-lg">₹</p>
            <input
              type="text"
              disabled
              value={formatNumber(Math.round(formValues.targetAmount / (formValues.yearsToGoal * 12)))}
              className={`bg-[#c3c3c38e] rounded-[15px] px-3 py-2 ${montserrat} border-2 border-[#747373] font-semibold w-48`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-2 rounded-[20px] p-4">
        <div className="font-medium">
          <p className={montserrat}>Current Goal Data in State:</p>
        </div>
        <pre className="bg-gray-100 p-3 rounded-lg text-xs overflow-auto max-h-40">
          {JSON.stringify(goalData || "No goal data available", null, 2)}
        </pre>
      </div>

      <div className="flex gap-5">
        <div
          onClick={handleSubmit}
          className="flex justify-center items-center bg-[#6F39C5] px-6 py-2 rounded-[25px] text-white cursor-pointer"
        >
          <p className={`${montserrat} font-semibold`}>Save Goal</p>
        </div>
        <div
          onClick={() => router.push("/user/goals")}
          className="flex justify-center items-center text-[#6F39C5] border-2 border-[#6F39C5] px-5 py-2 rounded-[25px] cursor-pointer"
        >
          <p className={`${montserrat} font-semibold`}>Cancel</p>
        </div>
      </div>
    </div>
  );
}