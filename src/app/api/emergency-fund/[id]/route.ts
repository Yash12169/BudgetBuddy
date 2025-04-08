import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
interface EmergencyFundStatus {
  monthsCovered: number;
  status: "critical" | "danger" | "warning" | "moderate" | "secure";
  message: string;
  score: number;
  recommendedMin: number;
  recommendedIdeal: number;
}
const formatAmount = (amount: number): string => {
  if (!amount || isNaN(amount)) return "₹0";
  if (amount < 100000) return "₹"+" "+`${Math.round(amount/1000)}K`;
  if (amount < 10000000) return "₹"+" "+`${(amount/100000).toFixed(2)}L`;
  return "₹"+" "+`${(amount/10000000).toFixed(2)}Cr`;
};
const calculateEmergencyStatus = (
  emergencyFund: number,
  salary: number
): EmergencyFundStatus => {
  const monthsCovered = emergencyFund / salary;

  let status: EmergencyFundStatus["status"];
  let message: string;
  let score : number;
  if (monthsCovered === 0) {
    status = "critical";
    message = " No emergency fund! Immediate risk if income stops";
    score = 0;
  } else if (monthsCovered < 1) {
    status = "danger";
    message = `Only ${monthsCovered.toFixed(1)} month coverage - High risk`;
    score = 20;
  } else if (monthsCovered < 3) {
    status = "warning";
    message = ` ${monthsCovered.toFixed(1)} months - Build more savings`;
    score = 60;
  } else if (monthsCovered < 6) {
    status = "moderate";
    message = ` ${monthsCovered.toFixed(1)} months - Adequate coverage`;
    score = 80
  } else {
    status = "secure";
    message = ` ${monthsCovered.toFixed(1)} months - Financially secure!`;
    score = 100;
  }

  return {
    monthsCovered: parseFloat(monthsCovered.toFixed(1)),
    status,
    score,
    message,
    recommendedMin: 3,
    recommendedIdeal: 6,
  };
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const userId = 1;
    const emergencyFund = Number(data.emergencyFund) || 0;
    const salary = Number(data.salary) || 0;

    const statusData = calculateEmergencyStatus(emergencyFund, salary);

    const newRecord = await prisma.emergencyFund.create({
      data: {
        userId,
        emergencyFund,
        salary,
        status: statusData.status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Emergency fund updated!",
        data: {
          record: newRecord,
          analysis: statusData,
        },
      },
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
    const finData = await prisma.financials.findFirst({
      where: {userId:userId}
    })
    
    const data = await prisma.emergencyFund.findFirst({
      where: { userId: userId },
    });
    if (!data) {
      return NextResponse.json(
        { success: false, message: "Emergency fund not found" },
        { status: 500 }
      );
    }
    const salary = finData?.salary;
    const emergencyFund = data?.emergencyFund;
    let emergencyFundStatus = null;
    if(emergencyFund && salary)
    {
      emergencyFundStatus = calculateEmergencyStatus(emergencyFund,salary)
    }


    
    return NextResponse.json(
      { success: true, message: "emergency fund found", data: data,emergencyFundAmount: formatAmount(data.emergencyFund),emergencyFundStatus:emergencyFundStatus },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "error fetching data", error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params}: { params: {userId:string} }) {
  try {
    const userId = params.userId
    await prisma.emergencyFund.delete({
      where:{userId:userId}
    })
    return NextResponse.json({success: true,message: "entry deleted successfully"},{status: 200})
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "error deleting your data", error: error },
      { status: 500 }
    );
  }
}
