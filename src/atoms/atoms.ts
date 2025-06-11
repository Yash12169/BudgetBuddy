import {atom} from 'jotai';

interface DebtData {
  loanAmount: number;
  loanTenure: number;
  interestRate: number;
  emiAmount: number;
}

interface DebtResponse {
  data: {
    data: DebtData;
    debtLoad: number;
  };
}

interface FinancialData {
  salary: number;
  expenses: number;
  extraExpenses: number;
  insurancePremium: number;
}

interface FinancialResponse {
  allData: FinancialData;
}

export const themeAtom = atom<string>('dark');
export const userAtom = atom(null);
export const financialAtom = atom<FinancialResponse | null>(null);
export const emergencyFundAtom = atom(null)
export const debtAtom = atom<DebtResponse | null>(null);
export const goalAtom = atom(null);