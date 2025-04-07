 import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 
const formatSalary = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return `₹${Math.round(amount/1000)}K`;
  if (amount < 10000000) return `₹${(amount/100000).toFixed(1)}L`;
  return `₹${(amount/10000000).toFixed(1)}Cr`;
};
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const salary = Number(data.salary) || 0;
    const expenses = Number(data.expenses) || 0;
    const extraExpenses = Number(data.extraExpenses) || 0;
    const insurancePremium = Number(data.insurancePremium) || 0; 
    const emi = Number(data.emi) || 0;

    
    const newRecord = await prisma.financials.create({
      data: {
        userId: "1", 
        salary,
        expenses,
        extraExpenses,
        insurancePremium, 
        emi,
      },
    });

    console.log("Stored new financial data:", newRecord);

    return NextResponse.json(
      { success: true, message: "Financial data stored", data: newRecord },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error processing financial data:", err);
    return NextResponse.json(
      { success: false, message: "Failed to store data", error: err.message },
      { status: 500 }
    );
  }
}
