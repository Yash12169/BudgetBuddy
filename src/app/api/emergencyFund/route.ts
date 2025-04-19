
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface EmergencyFundStatus {
  monthsCovered: number;
  status: 'critical' | 'danger' | 'warning' | 'moderate' | 'secure';
  message: string;
  recommendedMin: number;
  recommendedIdeal: number;
}

export async function GET() {
  try {
    const emergencyFunds = await prisma.emergencyFund.findMany();
    return NextResponse.json({ success: true, data: emergencyFunds });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const userId = String(data.userId); 
    const emergencyFund = Number(data.emergencyFund) || 0;

    // Get user's salary from financials
    const financials = await prisma.financials.findUnique({
      where: { userId }
    });

    if (!financials) {
      return NextResponse.json(
        { success: false, message: "User financial information not found" },
        { status: 400 }
      );
    }

    const statusData = calculateEmergencyStatus(emergencyFund, financials.salary);

    // Use upsert to handle both create and update
    const record = await prisma.emergencyFund.upsert({
      where: { userId },
      update: { 
        emergencyFund,
        status: statusData.status
      },
      create: {
        userId,
        emergencyFund,
        status: statusData.status
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Emergency fund updated!", 
        data: {
          record,
          analysis: statusData
        }
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

const calculateEmergencyStatus = (emergencyFund: number, salary: number): EmergencyFundStatus => {
  const monthsCovered = salary > 0 ? emergencyFund / salary : 0;
  
  let status: EmergencyFundStatus['status'];
  let message: string;

  if (monthsCovered === 0) {
    status = 'critical';
    message = 'No emergency fund! Immediate risk if income stops';
  } 
  else if (monthsCovered < 1) {
    status = 'danger';
    message = `Only ${monthsCovered.toFixed(1)} month coverage - High risk`;
  }
  else if (monthsCovered < 3) {
    status = 'warning';
    message = `${monthsCovered.toFixed(1)} months - Build more savings`;
  }
  else if (monthsCovered < 6) {
    status = 'moderate';
    message = `${monthsCovered.toFixed(1)} months - Adequate coverage`;
  }
  else {
    status = 'secure';
    message = `${monthsCovered.toFixed(1)} months - Financially secure!`;
  }

  return {
    monthsCovered: parseFloat(monthsCovered.toFixed(1)),
    status,
    message,
    recommendedMin: 3,
    recommendedIdeal: 6
  };
};