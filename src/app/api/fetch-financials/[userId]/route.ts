import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const calcualteSavingScore=(savings: number):number=>{
  if(savings >= 50) return 100;
  if(savings >=  40) return 80;
  if(savings >= 30) return 60;
  if(savings >= 20) return 40;
  if(savings >= 10) return 20
  return 0;
}
const formatSalary = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return `₹${Math.round(amount/1000)}K`;
  if (amount < 10000000) return `₹${(amount/100000).toFixed(1)}L`;
  return `₹${(amount/10000000).toFixed(1)}Cr`;
};
export async function GET(req: NextRequest,{params}:{params:{userId:string}}) {
  try {
    const userId = Number(params.userId);
    const data = await prisma.financials.findUnique({ 
      where: { id: userId } 
    });
    
    if(!data){
      return NextResponse.json({
        success: false,
        message: "User not found",
      },{status: 500})
    }
    const {salary,expenses,extraExpenses,insurancePremium} = data
    const totalExpenses = (expenses ?? 0) + (extraExpenses ?? 0) + (insurancePremium ?? 0);
    const savings = salary - totalExpenses;
    const savingPercent = parseFloat(((savings/salary)*100).toFixed(2));


    const savingScore = calcualteSavingScore(savingPercent);

    
    return NextResponse.json(
      { success: true, message: "Financial data fetched", data: {salary:data.salary,expenses:data.expenses,savingsPercent:savingPercent,savingScore:savingScore,formattedSalary:formatSalary(data.salary)} },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching financial data:", error);
    
    return NextResponse.json(
      { success: false, message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}