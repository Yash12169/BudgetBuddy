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

export const themeAtom = atom<string>('dark');
export const userAtom = atom<User | null>(null);
export const financialAtom = atom<FinancialResponse | null>(null);
export const emergencyFundAtom = atom<EmergencyFundResponse | null>(null);
export const debtAtom = atom<DebtResponse | null>(null);
export const goalAtom = atom(null);