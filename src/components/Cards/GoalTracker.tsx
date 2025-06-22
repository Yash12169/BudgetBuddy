import { useEffect, useState } from "react";
import { useUser  } from "@clerk/nextjs";
import Image from "next/image";
import tracker from '../../assets/dash-goal-tracker.svg';
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
  const { user } = useUser ();
  const [goals, setGoals] = useState<Goal[]>([]); 

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/goals/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGoals(data.data);
        }
      })
      .catch(err => console.error("Error fetching goals:", err));
  }, [user?.id]);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black flex flex-col gap-4 px-4 py-4 md:px-7 md:py-8 text-neutral-content rounded-[30px] w-full md:max-w-3xl md:mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-block">
            <Image src={tracker} height={36} width={36} alt="tracker" />
          </span>
          <p className={`text-xl text-white font-semibold ${montserrat}`}>Top Goals</p>
        </div>
        <p className={`text-sm ${montserrat}`}>A summary of your Top Goals and possibility</p>
      </div>

      {goals.map((goal: Goal) => (
        <div key={goal.id} className="flex border justify-between rounded-[15px] px-3 py-2 md:px-5 md:py-3 w-full mb-2 md:mb-3">
          <div className="flex gap-2 md:gap-3 items-center">
            <span className="hidden md:inline-block">
              <Image
                src={getGoalIcon(goal.category)}
                alt={goal.category}
                width={40}
                height={40}
                className="object-contain"
              />
            </span>
            <div className="flex flex-col">
              <p className={`font-semibold text-white ${montserrat}`}>{goal.title}</p>
              <p className="text-sm">Target to achieve in {new Date().getFullYear() + goal.yearsToGoal}</p>
            </div>
          </div>
          <div className="flex text-sm gap-3 md:gap-6">
            <div className="flex flex-col">
              <p>Priority</p>
              <p className="font-semibold">{goal.priority}</p>
            </div>
            <div className={`flex flex-col ${montserrat}`}> 
              <p>Amount</p>
              <p className="font-semibold">{Math.round(goal.targetAmount / 100000)} Lakh</p>
            </div>
            <div className="flex flex-col">
              <p>Target Year</p>
              <p className="font-semibold">{new Date().getFullYear() + goal.yearsToGoal}</p>
            </div>
          </div>
          <div className={`text-sm flex flex-col text-white ${montserrat}`}> 
            <p>Goal Possibility</p>
            <p className="font-semibold text-[#864be4]">
              {goal.isAchievable ? "Possible" : "Not Possible"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}