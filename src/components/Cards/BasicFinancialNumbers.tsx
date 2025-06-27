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
        <div className="bg-neutral text-neutral-content border border-neutral-content/20 rounded-2xl shadow-lg overflow-hidden">
          {/* Header Skeleton */}
          <div className="border-b border-neutral-content/20 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <div className="skeleton w-6 h-6 rounded"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="skeleton h-6 w-48"></div>
                <div className="skeleton h-4 w-32"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-4 rounded-xl border border-neutral-content/20 bg-neutral-focus">
                  <div className="skeleton h-3 w-20 mb-2"></div>
                  <div className="skeleton h-6 w-16"></div>
                </div>
              ))}
            </div>

            {/* Summary Section Skeleton */}
            <div className="mt-6 p-4 bg-neutral-focus rounded-xl border border-neutral-content/20">
              <div className="skeleton h-4 w-24 mb-2"></div>
              <div className="space-y-2">
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-3/4"></div>
                <div className="skeleton h-3 w-5/6"></div>
              </div>
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
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20"
    },
    {
      label: "Monthly Savings",
      value: formatCurrency(monthlySavings),
      color: monthlySavings >= 0 ? "text-success" : "text-error",
      bgColor: monthlySavings >= 0 ? "bg-success/10" : "bg-error/10",
      borderColor: monthlySavings >= 0 ? "border-success/20" : "border-error/20"
    },
    {
      label: "Savings Rate",
      value: formatPercentage(savingsRate),
      color: savingsRate >= 20 ? "text-success" : savingsRate >= 10 ? "text-warning" : "text-error",
      bgColor: savingsRate >= 20 ? "bg-success/10" : savingsRate >= 10 ? "bg-warning/10" : "bg-error/10",
      borderColor: savingsRate >= 20 ? "border-success/20" : savingsRate >= 10 ? "border-warning/20" : "border-error/20"
    },
    {
      label: "Emergency Fund",
      value: `${emergencyFundMonths.toFixed(1)} months`,
      color: emergencyFundMonths >= 6 ? "text-success" : emergencyFundMonths >= 3 ? "text-warning" : "text-error",
      bgColor: emergencyFundMonths >= 6 ? "bg-success/10" : emergencyFundMonths >= 3 ? "bg-warning/10" : "bg-error/10",
      borderColor: emergencyFundMonths >= 6 ? "border-success/20" : emergencyFundMonths >= 3 ? "border-warning/20" : "border-error/20"
    },
    {
      label: "Total Debt",
      value: formatCurrency(debtAmount),
      color: debtAmount === 0 ? "text-success" : "text-error",
      bgColor: debtAmount === 0 ? "bg-success/10" : "bg-error/10",
      borderColor: debtAmount === 0 ? "border-success/20" : "border-error/20"
    },
    {
      label: "Net Worth",
      value: formatCurrency(netWorth),
      color: netWorth >= 0 ? "text-success" : "text-error",
      bgColor: netWorth >= 0 ? "bg-success/10" : "bg-error/10",
      borderColor: netWorth >= 0 ? "border-success/20" : "border-error/20"
    }
  ];

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="bg-neutral text-neutral-content border border-neutral-content/20 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b border-neutral-content/20 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" className="text-success"/>
              </svg>
            </div>
            <div>
              <h2 className={`text-xl font-semibold text-neutral-content ${montserrat}`}>
                Basic Financial Numbers
              </h2>
              <p className={`text-sm text-neutral-content/70 ${poppins}`}>
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
                className={`p-4 rounded-xl border ${metric.bgColor} ${metric.borderColor} transition-all duration-300 hover:shadow-md bg-neutral-focus`}
              >
                <div className={`text-xs font-medium text-neutral-content/70 ${poppins} mb-2`}>
                  {metric.label}
                </div>
                <div className={`text-lg font-bold ${metric.color} ${montserrat}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-6 p-4 bg-neutral-focus rounded-xl border border-neutral-content/20">
            <h3 className={`text-sm font-semibold text-neutral-content ${montserrat} mb-2`}>
              Quick Insights
            </h3>
            <div className="space-y-1">
              {/* Savings Rate Insights */}
              {savingsRate < 10 && (
                <p className={`text-xs text-error ${poppins}`}>
                  ⚠️ Your savings rate is below recommended 10%. Consider reducing expenses.
                </p>
              )}
              {savingsRate >= 10 && savingsRate < 20 && (
                <p className={`text-xs text-warning ${poppins}`}>
                  📈 Good savings rate! Aim for 20%+ for better financial security.
                </p>
              )}
              {savingsRate >= 20 && (
                <p className={`text-xs text-success ${poppins}`}>
                  ✅ Excellent savings rate! You&apos;re on track for financial goals.
                </p>
              )}

              {/* Emergency Fund Insights */}
              {emergencyFundMonths < 3 && (
                <p className={`text-xs text-error ${poppins}`}>
                  ⚠️ Emergency fund covers less than 3 months. Aim for 3-6 months of expenses.
                </p>
              )}
              {emergencyFundMonths >= 3 && emergencyFundMonths < 6 && (
                <p className={`text-xs text-warning ${poppins}`}>
                  🛡️ Emergency fund is adequate. Consider building to 6 months for extra security.
                </p>
              )}
              {emergencyFundMonths >= 6 && (
                <p className={`text-xs text-success ${poppins}`}>
                  🛡️ Strong emergency fund! You&apos;re well-protected against unexpected expenses.
                </p>
              )}

              {/* Debt Insights */}
              {debtAmount > 0 && debtToIncomeRatio > 40 && (
                <p className={`text-xs text-error ${poppins}`}>
                  ⚠️ Debt-to-income ratio is high. Focus on debt reduction.
                </p>
              )}
              {debtAmount > 0 && debtToIncomeRatio <= 40 && debtToIncomeRatio > 20 && (
                <p className={`text-xs text-warning ${poppins}`}>
                  💳 Manageable debt level. Consider paying off high-interest debt first.
                </p>
              )}
              {debtAmount > 0 && debtToIncomeRatio <= 20 && (
                <p className={`text-xs text-success ${poppins}`}>
                  💳 Low debt burden. You&apos;re managing debt well.
                </p>
              )}
              {debtAmount === 0 && (
                <p className={`text-xs text-success ${poppins}`}>
                  🎉 Debt-free! Excellent financial position.
                </p>
              )}

              {/* Net Worth Insights */}
              {netWorth < 0 && (
                <p className={`text-xs text-error ${poppins}`}>
                  📉 Negative net worth. Focus on building assets and reducing liabilities.
                </p>
              )}
              {netWorth >= 0 && netWorth < salary * 3 && (
                <p className={`text-xs text-warning ${poppins}`}>
                  📊 Positive net worth! Consider investing to grow your wealth.
                </p>
              )}
              {netWorth >= salary * 3 && (
                <p className={`text-xs text-success ${poppins}`}>
                  📊 Strong net worth! You&apos;re building solid financial foundation.
                </p>
              )}

              {/* Overall Financial Health */}
              {savingsRate >= 20 && emergencyFundMonths >= 6 && debtAmount === 0 && netWorth > 0 && (
                <p className={`text-xs text-success ${poppins} font-semibold mt-2 pt-2 border-t border-success/20`}>
                  🏆 Outstanding financial health! You&apos;re setting an excellent example.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 