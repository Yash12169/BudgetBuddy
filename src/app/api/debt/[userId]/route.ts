import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
const formatAmount = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return "₹"+" "+`${Math.round(amount/1000)}K`;
  if (amount < 10000000) return "₹"+" "+`${(amount/100000).toFixed(2)}L`;
  return "₹"+" "+`${(amount/10000000).toFixed(2)}Cr`;
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const userId = 1;
    const loanAmount = Number(data.loanAmount) || 0;
    const loanTenure = Number(data.loanTenure) || 0;
    const interestRate = Number(data.interestRate) || 0;
    const emiAmount = Number(data.emiAmount);
    console.log(prisma.debt);

    const newRecord = await prisma.debt.create({
      data: {
        userId,
        loanAmount,
        loanTenure,
        interestRate,
        emiAmount,
      },
    });
    return NextResponse.json(
      { success: true, message: "debt data stored", data: newRecord },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const data = await prisma.debt.findFirst({
      where: { userId: userId },
    });
    if (!data) {
      return NextResponse.json(
        { success: false, message: "data not found" },
        { status: 500 }
      );
    }
    const emiAmount = data.emiAmount;
    const financialData = await prisma.financials.findUnique({
      where: { id: userId },
    });

    if (!financialData)
      return NextResponse.json(
        { success: false, message: "data missing please try again" },
        { status: 500 }
      );
    const salary = financialData.salary;

    const debtLoad = parseFloat(((emiAmount / salary) * 100).toFixed(2));
    const loanAmount = formatAmount(data.loanAmount)
    return NextResponse.json(
      {
        success: true,
        message: "data fetched successfully",
        data: { data: data, debtLoad: debtLoad },
        loanAmount: loanAmount,
        emiAmount: formatAmount(emiAmount),
        rawAmount: emiAmount
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
