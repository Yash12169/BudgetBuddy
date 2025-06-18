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

export default function GoalEditCard() {
  const router = useRouter();
  const { user } = useUser();
  const [goalData, setGoalData] = useAtom(goalAtom);
  const [financialData] = useAtom(financialAtom);
  
  const [formValues, setFormValues] = useState({
    title: "",
    targetAmount: 0,
    yearsToGoal: 1,
    category: "Education",
    currentSalary: 0,
    annualIncrementRate: 5,
    priority: 3
  });

  useEffect(() => {
    if (goalData) {
      setFormValues({
        //@ts-expect-error - TODO: fix this
        title: goalData.title || "",
        //@ts-expect-error - TODO: fix this
        targetAmount: goalData.targetAmount || 0,
        //@ts-expect-error - TODO: fix this
        yearsToGoal: goalData.yearsToGoal || 1,
        //@ts-expect-error - TODO: fix this
        category: goalData.category || "Education",
        //@ts-expect-error - TODO: fix this
        currentSalary: goalData.currentSalary || financialData?.income || 0,
        //@ts-expect-error - TODO: fix this
        annualIncrementRate: goalData.annualIncrementRate || 5,
        //@ts-expect-error - TODO: fix this
        priority: goalData.priority || 3
      });

    } 
    //@ts-expect-error - TODO: fix this
    else if (financialData?.income) {
      setFormValues(prev => ({
        ...prev,
        //@ts-expect-error - TODO: fix this
        currentSalary: financialData.income
      }));
    }
  }, [goalData, financialData, setFormValues]);

  const [achievabilityScore, setAchievabilityScore] = useState(0);
  const [amountRequired, setAmountRequired] = useState(0);
  const [forecastedSalary, setForecastedSalary] = useState(0);
  const [showSampleGoals, setShowSampleGoals] = useState(false);
    useEffect(() => {
    if (!formValues.targetAmount || !formValues.yearsToGoal || !formValues.currentSalary) return;

    const forecast = formValues.currentSalary * Math.pow(
      (1 + formValues.annualIncrementRate / 100), 
      formValues.yearsToGoal
    );
    setForecastedSalary(forecast);

    const monthlyRequired = formValues.targetAmount / (formValues.yearsToGoal * 12);
    setAmountRequired(monthlyRequired);
    const monthlySalary = formValues.currentSalary / 12;
    const affordabilityRatio = monthlySalary > 0 ? monthlyRequired / monthlySalary : 0;
    
    let score = 0;
    if (affordabilityRatio <= 0.1) score = 90; 
    else if (affordabilityRatio <= 0.2) score = 75; 
    else if (affordabilityRatio <= 0.3) score = 60; 
    else if (affordabilityRatio <= 0.4) score = 45; 
    else if (affordabilityRatio <= 0.5) score = 30; 
    else score = 15; 
    
    if (formValues.yearsToGoal > 5) score += 10;
    else if (formValues.yearsToGoal < 2) score -= 10;
    
    score = Math.max(0, Math.min(100, score));
    setAchievabilityScore(Math.round(score));
  }, [formValues, setForecastedSalary, setAmountRequired, setAchievabilityScore, setFormValues]);

  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    if (key === 'targetAmount' || key === 'yearsToGoal' || key === 'currentSalary' || key === 'annualIncrementRate') {
      //@ts-expect-error - TODO: fix this
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
    try {
      const updatedGoal = {
        ...(goalData || {}),
        ...formValues,
        adjustedTargetAmount: formValues.targetAmount,
        forecastedSalary,
        amountRequired,
        isAchievable: achievabilityScore > 40,
        userId: user?.id
      };
      
      //@ts-expect-error - TODO: fix this
      setGoalData(updatedGoal);

      //@ts-expect-error - TODO: fix this
      if (goalData?.id) {
        //@ts-expect-error - TODO: fix this
        await axios.put(`/api/goals/${goalData.id}`, updatedGoal);
      } else {
        await axios.post('/api/goals', updatedGoal);
      }
      
      router.push("/user/goals");
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };

  interface SampleGoal {
    id: string;
    title: string;
    targetAmount: number;
    adjustedTargetAmount: number;
    amountRequired: number;
    yearsToGoal: number;
    category: string;
    currentSalary: number;
    annualIncrementRate: number;
    forecastedSalary: number;
    isAchievable: boolean;
    priority: number;
  }

  const loadSampleGoal = (sample: SampleGoal) => {
    setFormValues({
      title: sample.title,
      targetAmount: sample.targetAmount,
      yearsToGoal: sample.yearsToGoal,
      category: sample.category,
      currentSalary: sample.currentSalary,
      annualIncrementRate: sample.annualIncrementRate,
      priority: sample.priority
    });
    setShowSampleGoals(false);
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
          <label className={poppins}>
            Target Amount <span className="text-red-600 text-xl">*</span>
          </label>
          <div className="flex items-center gap-3">
            <p className="font-semibold text-lg">₹</p>
            <input
              type="text"
              value={formValues.targetAmount}
              onChange={handleInputChange("targetAmount")}
              className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-48`}
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
              type="text"
              value={formValues.currentSalary}
              onChange={handleInputChange("currentSalary")}
              className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-48`}
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className={poppins}>
            Annual Increment (%) <span className="text-red-600 text-xl">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={formValues.annualIncrementRate}
              onChange={handleInputChange("annualIncrementRate")}
              min="0"
              max="100"
              step="0.5"
              className={`bg-white rounded-[15px] px-3 py-2 ${montserrat} border-2 border-gray-200 font-semibold focus:outline-none focus:border-[#6F39C5] transition-all duration-300 ease-in-out w-32`}
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
              value={formatNumber(Math.round(forecastedSalary))}
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
              value={formatNumber(Math.round(amountRequired))}
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