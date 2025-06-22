import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const calculateSavingScore = (savings: number): number => {
  if (savings >= 50) return 100;
  if (savings >= 40) return 80;
  if (savings >= 30) return 60;
  if (savings >= 20) return 40;
  if (savings >= 10) return 20;
  return 0;
};

const calculateSavingStatus = (savings: number): string => {
  if (savings >= 50) return "strong";
  if (savings >= 40) return "strong";
  if (savings >= 30) return "moderate";
  if (savings >= 20) return "moderate";
  if (savings >= 10) return "weak";
  return "weak";
};

const formatAmount = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return "₹" + " " + `${Math.round(amount / 1000)}K`;
  if (amount < 10000000) return "₹" + " " + `${(amount / 100000).toFixed(2)}L`;
  return "₹" + " " + `${(amount / 10000000).toFixed(2)}Cr`;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const data = await prisma.financials.findUnique({
      where: { userId },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Financial data not found" },
        { status: 404 }
      );
    }

    const { salary, expenses, extraExpenses, insurancePremium } = data;
    const totalExpenses = (expenses ?? 0) + (extraExpenses ?? 0) + (insurancePremium ?? 0);
    const savings = salary - totalExpenses;
    const savingPercent = parseFloat(((savings / salary) * 100).toFixed(2));

    const savingScore = calculateSavingScore(savingPercent);
    const savingStatus = calculateSavingStatus(savingPercent);

    return NextResponse.json(
      {
        success: true,
        message: "Financial data fetched",
        allData: data,
        data: {
          salary: formatAmount(data.salary),
          amount: data.salary,
          netWorth: data.netWorth || 0,
          expenses: formatAmount(data.expenses),
          savingsPercent: savingPercent,
          savingScore: savingScore,
          savingStatus: savingStatus,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: "Error fetching data", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const data = await req.json();

    if (!data.salary || !data.expenses) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: salary and expenses" },
        { status: 400 }
      );
    }

    const existingRecord = await prisma.financials.findUnique({
      where: { userId },
    });

    if (existingRecord) {
      return NextResponse.json(
        { success: false, message: "Financial record already exists. Use PUT to update." },
        { status: 409 }
      );
    }

    const newRecord = await prisma.financials.create({
      data: {
        userId,
        salary: Number(data.salary),
        netWorth: Number(data.netWorth) || 0,
        expenses: Number(data.expenses),
        extraExpenses: Number(data.extraExpenses) || 0,
        insurancePremium: Number(data.insurancePremium) || 0,
        annualIncrementRate: Number(data.annualIncrementRate) || 0.05,
      },
    });

    return NextResponse.json(
      { success: true, message: "Financial data created successfully", data: newRecord },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: "Error creating financial data", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const data = await req.json();

    if (!data.salary || !data.expenses) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: salary and expenses" },
        { status: 400 }
      );
    }

    const existingRecord = await prisma.financials.findUnique({
      where: { userId },
    });

    if (!existingRecord) {
      return NextResponse.json(
        { success: false, message: "Financial record not found" },
        { status: 404 }
      );
    }

    const updatedRecord = await prisma.financials.update({
      where: { userId },
      data: {
        salary: Number(data.salary),
        netWorth: Number(data.netWorth) || 0,
        expenses: Number(data.expenses),
        extraExpenses: Number(data.extraExpenses) || 0,
        insurancePremium: Number(data.insurancePremium) || 0,
        annualIncrementRate: Number(data.annualIncrementRate) || 0.05,
      },
    });

    // Calculate the same fields as GET endpoint
    const { salary, expenses, extraExpenses, insurancePremium } = updatedRecord;
    const totalExpenses = (expenses ?? 0) + (extraExpenses ?? 0) + (insurancePremium ?? 0);
    const savings = salary - totalExpenses;
    const savingPercent = parseFloat(((savings / salary) * 100).toFixed(2));

    const savingScore = calculateSavingScore(savingPercent);
    const savingStatus = calculateSavingStatus(savingPercent);

    return NextResponse.json(
      {
        success: true,
        message: "Financial data updated successfully",
        allData: updatedRecord,
        data: {
          salary: formatAmount(updatedRecord.salary),
          amount: updatedRecord.salary,
          netWorth: updatedRecord.netWorth || 0,
          expenses: formatAmount(updatedRecord.expenses),
          savingsPercent: savingPercent,
          savingScore: savingScore,
          savingStatus: savingStatus,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: "Error updating financial data", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const existingRecord = await prisma.financials.findUnique({
      where: { userId },
    });

    if (!existingRecord) {
      return NextResponse.json(
        { success: false, message: "Financial record not found" },
        { status: 404 }
      );
    }

    await prisma.financials.delete({
      where: { userId },
    });

    return NextResponse.json(
      { success: true, message: "Financial data deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: "Error deleting financial data", error: errorMessage },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic"; 