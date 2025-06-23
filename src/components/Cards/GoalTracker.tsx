import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import tracker from "../../assets/dash-goal-tracker.svg";
import { montserrat } from "@/fonts/fonts";

interface Goal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  yearsToGoal: number;
  category: string;
  isAchievable: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

const ICONS = {
  realestate: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3e0.svg",
  education: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f393.svg",
  general: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4b0.svg",
  automobile: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f697.svg",
};

const getGoalIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "realestate":
      return ICONS.realestate;
    case "education":
      return ICONS.education;
    case "general":
      return ICONS.general;
    case "automobile":
      return ICONS.automobile;
    default:
      return ICONS.general;
  }
};

export default function GoalTracker() {
  const { user } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/goals/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGoals(data.data);
        }
      })
      .catch((err) => console.error("Error fetching goals:", err));
  }, [user?.id]);

  return (
    <div className={`bg-black flex flex-col gap-6 p-6 rounded-2xl w-full text-white ${montserrat}`}>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-block">
            <Image src={tracker} height={36} width={36} alt="tracker" />
          </span>
          <h2 className="text-xl font-semibold">Top Goals</h2>
        </div>
        <p className="text-sm text-white/80">A summary of your Top Goals and possibility</p>
      </div>

      {/* Goals list */}
      <div className="flex flex-col gap-4">
        {goals.map((goal: Goal) => (
          <div
            key={goal.id}
            className="bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-center rounded-xl p-4 gap-y-4 gap-x-8"
          >
            {/* Goal Icon + Info */}
            <div className="flex items-center gap-4 justify-center flex-1 min-w-[160px]">
              <Image
                src={getGoalIcon(goal.category)}
                alt={goal.category}
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{goal.title}</p>
                <p className="text-xs text-white/70">
                  Target Year: {new Date().getFullYear() + goal.yearsToGoal}
                </p>
              </div>
            </div>

            {/* Center group: Priority, Amount, Target Year */}
            <div className="flex flex-row gap-x-3 flex-1 justify-center">
              <div className="flex flex-col text-center flex-1 min-w-[120px]">
                <p className="text-xs text-white/70">Priority</p>
                <p className="font-semibold">{goal.priority}</p>
              </div>
              <div className="flex flex-col text-center flex-1 min-w-[120px]">
                <p className="text-xs text-white/70">Amount</p>
                <p className="font-semibold">{Math.round(goal.targetAmount / 100000)} Lakh</p>
              </div>
              <div className="flex flex-col text-center flex-1 min-w-[120px]">
                <p className="text-xs text-white/70">Target Year</p>
                <p className="font-semibold">{new Date().getFullYear() + goal.yearsToGoal}</p>
              </div>
            </div>

            {/* Goal Possibility */}
            <div className="flex flex-col text-center flex-1 min-w-[120px]">
              <p className="text-xs text-white/70">Goal Possibility</p>
              <p
                className={`font-semibold ${
                  goal.isAchievable ? "text-green-400" : "text-red-400"
                }`}
              >
                {goal.isAchievable ? "Possible" : "Not Possible"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
