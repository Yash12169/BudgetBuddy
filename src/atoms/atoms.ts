import {atom} from 'jotai';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
}

interface DebtData {
  id: string;
  userId: string;
  loanAmount: number;
  loanTenure: number;
  emiAmount: number;
  createdAt: string;
  updatedAt: string;
}

interface DebtResponse {
  data: {
    data: DebtData;
    debtLoad: number;
  };
}

interface FinancialData {
  id: string;
  userId: string;
  salary: number;
  netWorth: number;
  expenses: number;
  extraExpenses: number;
  insurancePremium: number;
  annualIncrementRate: number;
  createdAt: string;
  updatedAt: string;
}

interface FinancialResponse {
  allData: FinancialData;
  data: {
    salary: string;
    amount: number;
    netWorth: number;
    expenses: string;
    savingsPercent: number;
    savingScore: number;
    savingStatus: string;
  };
}

interface EmergencyFundData {
  id: string;
  userId: string;
  emergencyFund: number;
  createdAt: string;
  updatedAt: string;
}

interface EmergencyFundResponse {
  success: boolean;
  message: string;
  data: EmergencyFundData;
  emergencyFundAmount: string;
  emergencyFundStatus?: {
    monthsCovered: number;
    status: string;
    message: string;
    score: number;
    recommendedMin: number;
    recommendedIdeal: number;
  };
}

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

interface GoalResponse {
  data: Goal[];
}

// Initialize with a default theme that will be consistent between server and client
export const themeAtom = atom<string>('dark');

// Custom atom with localStorage persistence
export const persistentThemeAtom = atom(
  (get) => get(themeAtom),
  (get, set, newValue: string) => {
    set(themeAtom, newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem('budget-buddy-theme', newValue);
    }
  }
);

export const userAtom = atom<User | null>(null);
export const financialAtom = atom<FinancialResponse | null>(null);
export const emergencyFundAtom = atom<EmergencyFundResponse | null>(null);
export const debtAtom = atom<DebtResponse | null>(null);
export const goalAtom = atom<Goal[] | GoalResponse | null>(null);