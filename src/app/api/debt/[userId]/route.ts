import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

const formatAmount = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return "₹"+" "+`${Math.round(amount/1000)}K`;
  if (amount < 10000000) return "₹"+" "+`${(amount/100000).toFixed(2)}L`;
  return "₹"+" "+`${(amount/10000000).toFixed(2)}Cr`;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const data = await req.json();
    
    if (!data.loanAmount || !data.loanTenure) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: loanAmount and loanTenure" },
        { status: 400 }
      );
    }
    const loanAmount = Number(data.loanAmount);
    const loanTenure = Number(data.loanTenure);
    const interestRate = Number(data.interestRate) || 0;
    const emiAmount = Number(data.emiAmount) || 0;
    const existingDebt = await prisma.debt.findFirst({
      where: { userId },
    });

    if (existingDebt) {
      return NextResponse.json(
        { success: false, message: "User already has a debt record. Use PUT to update." },
        { status: 409 }
      );
    }

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
      { success: true, message: "Debt record created successfully", data: newRecord },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating debt record:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: errorMessage },
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
     const data = await prisma.debt.findUnique({
      where: { userId: userId }
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "No debt data found for this user" },
        { status: 404 }
      );
    }

    const emiAmount = data.emiAmount;
    const financialData = await prisma.financials.findFirst({
      where: { userId },
    });

    if (!financialData) {
      return NextResponse.json(
        { success: false, message: "Financial data not found for this user" },
        { status: 404 }
      );
    }

    const salary = financialData.salary;
    const debtLoad = parseFloat(((emiAmount / salary) * 100).toFixed(2));
    const loanAmount = formatAmount(data.loanAmount);

    return NextResponse.json(
      {
        success: true,
        message: "Data fetched successfully",
        data: { data, debtLoad },
        loanAmount,
        emiAmount: formatAmount(emiAmount),
        rawAmount: emiAmount
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching debt data:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const data = await req.json();
    
    if (!data.loanAmount || !data.loanTenure) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: loanAmount and loanTenure" },
        { status: 400 }
      );
    }

    const loanAmount = Number(data.loanAmount);
    const loanTenure = Number(data.loanTenure);
    const interestRate = Number(data.interestRate) || 0;
    const emiAmount = Number(data.emiAmount) || 0;

    // Check if debt record exists
    const existingDebt = await prisma.debt.findFirst({
      where: { userId },
    });

    let updatedDebt;
    
    if (existingDebt) {
      updatedDebt = await prisma.debt.update({
        where: { id: existingDebt.id },
        data: {
          loanAmount,
          loanTenure,
          interestRate,
          emiAmount,
        },
      });
    } else {
      updatedDebt = await prisma.debt.create({
        data: {
          userId,
          loanAmount,
          loanTenure,
          interestRate,
          emiAmount,
        },
      });
    }

    // Get financial data for debt load calculation
    const financialData = await prisma.financials.findUnique({
      where: { userId },
    });

    if (!financialData) {
      return NextResponse.json(
        { 
          success: true, 
          message: "Debt data updated but financial data missing", 
          data: updatedDebt 
        },
        { status: 200 }
      );
    }

    const salary = financialData.salary;
    const debtLoad = parseFloat(((emiAmount / salary) * 100).toFixed(2));
    
    return NextResponse.json(
      {
        success: true,
        message: "Debt data updated successfully",
        data: { 
          data: updatedDebt, 
          debtLoad 
        },
        loanAmount: formatAmount(loanAmount),
        emiAmount: formatAmount(emiAmount),
        rawAmount: emiAmount
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating debt:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    
    const existingDebt = await prisma.debt.findFirst({
      where: { userId },
    });

    if (!existingDebt) {
      return NextResponse.json(
        { success: false, message: "No debt record found for this user" },
        { status: 404 }
      );
    }

    await prisma.debt.delete({
      where: { id: existingDebt.id },
    });

    return NextResponse.json(
      { success: true, message: "Debt record deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting debt:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";