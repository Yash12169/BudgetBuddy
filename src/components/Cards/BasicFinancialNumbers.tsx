"use client";

import { useAtom } from "jotai";
import { montserrat, poppins } from "@/fonts/fonts";
import { financialAtom, emergencyFundAtom, debtAtom } from "@/atoms/atoms";

const formatCurrency = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return "₹" + Math.round(amount / 1000) + "K";
  if (amount < 10000000) return "₹" + (amount / 100000).toFixed(1) + "L";
  return "₹" + (amount / 10000000).toFixed(1) + "Cr";
};

const formatPercentage = (value: number): string => {
  return value.toFixed(1) + "%";
};

export default function BasicFinancialNumbers() {
  const [financials] = useAtom(financialAtom);
  const [emergencyFund] = useAtom(emergencyFundAtom);
  const [debt] = useAtom(debtAtom);

  // Debug logging
  console.log('BasicFinancialNumbers render:', {
    financials: financials,
    emergencyFund: emergencyFund,
    debt: debt,
    hasAllData: !!financials?.allData
  });

  if (!financials?.allData) {
    console.log('Showing skeleton because financials.allData is missing:', financials);
    return (
      <div className="w-full max-w-8xl mx-auto">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate financial metrics
  const salary = financials.allData.salary || 0;
  const expenses = financials.allData.expenses || 0;
  const emergencyFundAmount = emergencyFund?.data?.emergencyFund || 0;
  const debtAmount = debt?.data?.data?.loanAmount || 0;
  const netWorth = financials.allData.netWorth || 0;

  // Calculate derived metrics
  const monthlySavings = salary - expenses;
  const savingsRate = salary > 0 ? (monthlySavings / salary) * 100 : 0;
  const emergencyFundMonths = salary > 0 ? emergencyFundAmount / salary : 0;
  const debtToIncomeRatio = salary > 0 ? (debtAmount / salary) * 100 : 0;

  // Debug emergency fund calculation
  console.log('Emergency Fund Calculation:', {
    emergencyFundAmount,
    salary,
    emergencyFundMonths: emergencyFundMonths.toFixed(1),
    calculation: `${emergencyFundAmount} / ${salary} = ${emergencyFundMonths.toFixed(1)} months`
  });

  const metrics = [
    {
      label: "Monthly Income",
      value: formatCurrency(salary),
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      label: "Monthly Savings",
      value: formatCurrency(monthlySavings),
      color: monthlySavings >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
      bgColor: monthlySavings >= 0 ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20",
      borderColor: monthlySavings >= 0 ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"
    },
    {
      label: "Savings Rate",
      value: formatPercentage(savingsRate),
      color: savingsRate >= 20 ? "text-green-600 dark:text-green-400" : savingsRate >= 10 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400",
      bgColor: savingsRate >= 20 ? "bg-green-50 dark:bg-green-900/20" : savingsRate >= 10 ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-red-50 dark:bg-red-900/20",
      borderColor: savingsRate >= 20 ? "border-green-200 dark:border-green-800" : savingsRate >= 10 ? "border-yellow-200 dark:border-yellow-800" : "border-red-200 dark:border-red-800"
    },
    {
      label: "Emergency Fund",
      value: `${emergencyFundMonths.toFixed(1)} months`,
      color: emergencyFundMonths >= 6 ? "text-green-600 dark:text-green-400" : emergencyFundMonths >= 3 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400",
      bgColor: emergencyFundMonths >= 6 ? "bg-green-50 dark:bg-green-900/20" : emergencyFundMonths >= 3 ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-red-50 dark:bg-red-900/20",
      borderColor: emergencyFundMonths >= 6 ? "border-green-200 dark:border-green-800" : emergencyFundMonths >= 3 ? "border-yellow-200 dark:border-yellow-800" : "border-red-200 dark:border-red-800"
    },
    {
      label: "Total Debt",
      value: formatCurrency(debtAmount),
      color: debtAmount === 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
      bgColor: debtAmount === 0 ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20",
      borderColor: debtAmount === 0 ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"
    },
    {
      label: "Net Worth",
      value: formatCurrency(netWorth),
      color: netWorth >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
      bgColor: netWorth >= 0 ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-red-50 dark:bg-red-900/20",
      borderColor: netWorth >= 0 ? "border-emerald-200 dark:border-emerald-800" : "border-red-200 dark:border-red-800"
    }
  ];

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#10B981"/>
              </svg>
            </div>
            <div>
              <h2 className={`text-xl font-semibold text-neutral-800 dark:text-neutral-100 ${montserrat}`}>
                Basic Financial Numbers
              </h2>
              <p className={`text-sm text-neutral-600 dark:text-neutral-300 ${poppins}`}>
                Key metrics at a glance
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${metric.bgColor} ${metric.borderColor} transition-all duration-300 hover:shadow-md`}
              >
                <div className={`text-xs font-medium text-neutral-600 dark:text-neutral-400 ${poppins} mb-2`}>
                  {metric.label}
                </div>
                <div className={`text-lg font-bold ${metric.color} ${montserrat}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <h3 className={`text-sm font-semibold text-neutral-800 dark:text-neutral-100 ${montserrat} mb-2`}>
              Quick Insights
            </h3>
            <div className="space-y-1">
              {/* Savings Rate Insights */}
              {savingsRate < 10 && (
                <p className={`text-xs text-red-600 dark:text-red-400 ${poppins}`}>
                  ⚠️ Your savings rate is below recommended 10%. Consider reducing expenses.
                </p>
              )}
              {savingsRate >= 10 && savingsRate < 20 && (
                <p className={`text-xs text-yellow-600 dark:text-yellow-400 ${poppins}`}>
                  📈 Good savings rate! Aim for 20%+ for better financial security.
                </p>
              )}
              {savingsRate >= 20 && (
                <p className={`text-xs text-green-600 dark:text-green-400 ${poppins}`}>
                  ✅ Excellent savings rate! You're on track for financial goals.
                </p>
              )}

              {/* Emergency Fund Insights */}
              {emergencyFundMonths < 3 && (
                <p className={`text-xs text-red-600 dark:text-red-400 ${poppins}`}>
                  ⚠️ Emergency fund covers less than 3 months. Aim for 3-6 months of expenses.
                </p>
              )}
              {emergencyFundMonths >= 3 && emergencyFundMonths < 6 && (
                <p className={`text-xs text-yellow-600 dark:text-yellow-400 ${poppins}`}>
                  🛡️ Emergency fund is adequate. Consider building to 6 months for extra security.
                </p>
              )}
              {emergencyFundMonths >= 6 && (
                <p className={`text-xs text-green-600 dark:text-green-400 ${poppins}`}>
                  🛡️ Strong emergency fund! You're well-protected against unexpected expenses.
                </p>
              )}

              {/* Debt Insights */}
              {debtAmount > 0 && debtToIncomeRatio > 40 && (
                <p className={`text-xs text-red-600 dark:text-red-400 ${poppins}`}>
                  ⚠️ Debt-to-income ratio is high. Focus on debt reduction.
                </p>
              )}
              {debtAmount > 0 && debtToIncomeRatio <= 40 && debtToIncomeRatio > 20 && (
                <p className={`text-xs text-yellow-600 dark:text-yellow-400 ${poppins}`}>
                  💳 Manageable debt level. Consider paying off high-interest debt first.
                </p>
              )}
              {debtAmount > 0 && debtToIncomeRatio <= 20 && (
                <p className={`text-xs text-green-600 dark:text-green-400 ${poppins}`}>
                  💳 Low debt burden. You're managing debt well.
                </p>
              )}
              {debtAmount === 0 && (
                <p className={`text-xs text-green-600 dark:text-green-400 ${poppins}`}>
                  🎉 Debt-free! Excellent financial position.
                </p>
              )}

              {/* Net Worth Insights */}
              {netWorth < 0 && (
                <p className={`text-xs text-red-600 dark:text-red-400 ${poppins}`}>
                  📉 Negative net worth. Focus on building assets and reducing liabilities.
                </p>
              )}
              {netWorth >= 0 && netWorth < salary * 3 && (
                <p className={`text-xs text-yellow-600 dark:text-yellow-400 ${poppins}`}>
                  📊 Positive net worth! Consider investing to grow your wealth.
                </p>
              )}
              {netWorth >= salary * 3 && (
                <p className={`text-xs text-green-600 dark:text-green-400 ${poppins}`}>
                  📊 Strong net worth! You're building solid financial foundation.
                </p>
              )}

              {/* Overall Financial Health */}
              {savingsRate >= 20 && emergencyFundMonths >= 6 && debtAmount === 0 && netWorth > 0 && (
                <p className={`text-xs text-emerald-600 dark:text-emerald-400 ${poppins} font-semibold mt-2 pt-2 border-t border-emerald-200 dark:border-emerald-700`}>
                  🏆 Outstanding financial health! You're setting an excellent example.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 