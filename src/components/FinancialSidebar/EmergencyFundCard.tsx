import { useAtom } from "jotai";
import { financialAtom } from "@/atoms/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const formatAmount = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return `₹${Math.round(amount/1000)}K`;
  if (amount < 10000000) return `₹${(amount/100000).toFixed(1)}L`;
  return `₹${(amount/10000000).toFixed(1)}Cr`;
};

export default function EmergencyFundCard() {
  const [financials] = useAtom(financialAtom);

  if (!financials) {
    return null;
  }

  const targetAmount = financials.monthlyExpenses * (financials.monthsCovered || 3);
  const currentAmount = financials.currentEmergencyFund || 0;
  const progress = (currentAmount / targetAmount) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Emergency Fund</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatAmount(currentAmount)}</div>
        <p className="text-xs text-muted-foreground">
          Target: {formatAmount(targetAmount)}
        </p>
        <Progress value={progress} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {progress.toFixed(1)}% of target reached
        </p>
      </CardContent>
    </Card>
  );
} 