import { LottieIcon } from "./LottieIcon";

export const ICON_PATHS = {
  dashboard: "/assets/dashboard.lottie",
  financial: "/assets/financial.lottie",
  expenses: "/assets/expenses.lottie",
  goals: "/assets/goals.lottie",
  investments: "/assets/investments.lottie",
  reports: "/assets/reports.lottie",
  advisor: "/assets/advisor.lottie",
  settings: "/assets/settings.lottie",
  logout: "/assets/logout.lottie",
} as const;

interface AnimatedIconProps {
  iconKey: keyof typeof ICON_PATHS;
  size?: number;
  className?: string;
}

export function AnimatedIcon({ iconKey, size = 24, className = "" }: AnimatedIconProps) {
  const iconPath = ICON_PATHS[iconKey];
  
  if (!iconPath) return null;
  
  return (
    <LottieIcon
      src={iconPath}
      size={size}
      hover={true}
      loop={true}
      autoplay={false}
      className={className}
    />
  );
} 