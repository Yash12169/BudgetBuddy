import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const calcualteSavingScore=(savings: number):number=>{
  if(savings >= 50) return 100;
  if(savings >=  40) return 80;
  if(savings >= 30) return 60;
  if(savings >= 20) return 40;
  if(savings >= 10) return 20;
  return 0;
}
const calcualteSavingStatus=(savings: number):string=>{
  if(savings >= 50) return "Strong";
  if(savings >=  40) return "Strong";
  if(savings >= 30) return "Moderate";
  if(savings >= 20) return "Moderate";
  if(savings >= 10) return "Weak";
  return "Weak";
}
const formatSalary = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return `₹${Math.round(amount/1000)}K`;
  if (amount < 10000000) return `₹${(amount/100000).toFixed(2)}L`;
  return `₹${(amount/10000000).toFixed(2)}Cr`;
};
export async function GET(req: NextRequest,{params}:{params:{userId:string}}) {
  try {
    const userId = params.userId;
    const data = await prisma.financials.findUnique({
      where: { userId: userId }
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
    const savingStatus = calcualteSavingStatus(savingPercent)
    
    return NextResponse.json(
      { success: true, message: "Financial data fetched", data: {salary:formatSalary(data.salary),expenses:data.expenses,savingsPercent:savingPercent,savingScore:savingScore,savingStatus: savingStatus} },
      { status: 200 }
    );
  } catch (error: any) {    
    return NextResponse.json(
      { success: false, message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}