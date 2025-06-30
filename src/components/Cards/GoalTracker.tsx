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
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      setHasFetched(true);
      return;
    }
    
    setIsLoading(true);
    fetch(`/api/goals/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const sortedGoals = data.data
            .sort((a: Goal, b: Goal) => b.priority - a.priority)
            .slice(0, 2);
          setGoals(sortedGoals);
        }
      })
      .catch((err) => console.error("Error fetching goals:", err))
      .finally(() => {
        setIsLoading(false);
        setHasFetched(true);
      });
  }, [user?.id]);

  const GoalSkeleton = () => (
    <div className="bg-neutral-focus border border-neutral-content/20 flex flex-col md:flex-row md:items-center justify-center rounded-xl p-3 md:p-4 gap-y-3 gap-x-6">
      <div className="flex items-center gap-3 justify-center flex-1 min-w-[160px]">
        <div className="skeleton w-10 h-10 rounded-lg"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-3 w-20"></div>
        </div>
      </div>

      <div className="flex flex-row gap-x-2 md:gap-x-3 flex-1 justify-center">
        <div className="flex flex-col text-center flex-1 min-w-[120px] gap-2">
          <div className="skeleton h-3 w-12 mx-auto"></div>
          <div className="skeleton h-4 w-8 mx-auto"></div>
        </div>
        <div className="flex flex-col text-center flex-1 min-w-[120px] gap-2">
          <div className="skeleton h-3 w-12 mx-auto"></div>
          <div className="skeleton h-4 w-16 mx-auto"></div>
        </div>
        <div className="flex flex-col text-center flex-1 min-w-[120px] gap-2">
          <div className="skeleton h-3 w-16 mx-auto"></div>
          <div className="skeleton h-4 w-12 mx-auto"></div>
        </div>
      </div>

      <div className="flex flex-col text-center flex-1 min-w-[120px] gap-2">
        <div className="skeleton h-3 w-20 mx-auto"></div>
        <div className="skeleton h-4 w-16 mx-auto"></div>
      </div>
    </div>
  );

  return (
    <div className={`bg-neutral flex flex-col gap-4 p-5 md:p-6 rounded-2xl w-full h-full text-neutral-content border border-neutral-content/20 ${montserrat}`}>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-block">
            <Image src={tracker} height={36} width={36} alt="tracker" />
          </span>
          <h2 className="text-xl font-semibold text-neutral-content">Top Goals</h2>
        </div>
        <p className="text-sm text-neutral-content/80">Your highest priority goals and their possibility</p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {isLoading ? (
          <div className="flex flex-col gap-3 flex-1 justify-center">
            <GoalSkeleton />
            <GoalSkeleton />
          </div>
        ) : hasFetched && goals.length === 0 ? (
          <div className="text-center py-6 text-neutral-content/60 flex-1 flex items-center justify-center">
            <p>No goals found. Add some goals to see them here!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 flex-1 justify-center">
            {goals.map((goal: Goal) => (
              <div
                key={goal.id}
                className="bg-neutral-focus border border-neutral-content/20 flex flex-row items-center justify-between rounded-xl p-2 sm:p-4 gap-x-2 sm:gap-x-6 w-full box-border overflow-hidden min-w-0"
              >
                <div className="flex items-center gap-2 sm:gap-3 justify-center flex-1 min-w-0">
                  <Image
                    src={getGoalIcon(goal.category)}
                    alt={goal.category}
                    width={40}
                    height={40}
                    className="object-contain hidden md:block"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-xs sm:text-sm md:text-base text-neutral-content truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">{goal.title}</p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-neutral-content/70 truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
                      Target Year: {new Date().getFullYear() + goal.yearsToGoal}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-x-2 sm:gap-x-3 flex-1 justify-center min-w-0">
                  <div className="flex flex-col text-center flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs md:text-sm text-neutral-content/70">Priority</p>
                    <p className="font-semibold text-xs sm:text-sm md:text-base text-neutral-content">{goal.priority}</p>
                  </div>
                  <div className="flex flex-col text-center flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs md:text-sm text-neutral-content/70">Amount</p>
                    <p className="font-semibold text-xs sm:text-sm md:text-base text-neutral-content">{Math.round(goal.targetAmount / 100000)} Lakh</p>
                  </div>
                  <div className="flex flex-col text-center flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs md:text-sm text-neutral-content/70">Target Year</p>
                    <p className="font-semibold text-xs sm:text-sm md:text-base text-neutral-content">{new Date().getFullYear() + goal.yearsToGoal}</p>
                  </div>
                </div>

                <div className="flex flex-col text-center flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs md:text-sm text-neutral-content/70">Goal Possibility</p>
                  <p
                    className={`font-semibold text-xs sm:text-sm md:text-base ${
                      goal.isAchievable ? "text-success" : "text-error"
                    }`}
                  >
                    {goal.isAchievable ? "Possible" : "Not Possible"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
