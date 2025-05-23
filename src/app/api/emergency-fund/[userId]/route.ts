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
  let score: number;
  
  if (monthsCovered === 0) {
    status = "critical";
    message = "No emergency fund! Immediate risk if income stops";
    score = 0;
  } else if (monthsCovered < 1) {
    status = "danger";
    message = `Only ${monthsCovered.toFixed(1)} month coverage - High risk`;
    score = 20;
  } else if (monthsCovered < 3) {
    status = "warning";
    message = `${monthsCovered.toFixed(1)} months - Build more savings`;
    score = 60;
  } else if (monthsCovered < 6) {
    status = "moderate";
    message = `${monthsCovered.toFixed(1)} months - Adequate coverage`;
    score = 80;
  } else {
    status = "secure";
    message = `${monthsCovered.toFixed(1)} months - Financially secure!`;
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

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const data = await req.json();
    const emergencyFund = Number(data.emergencyFund) || 0;

    const existingFund = await prisma.emergencyFund.findFirst({
      where: { userId: userId }
    });

    if (existingFund) {
      return NextResponse.json(
        { success: false, message: "Emergency fund already exists. Use PUT to update." },
        { status: 400 }
      );
    }

    const finData = await prisma.financials.findFirst({
      where: { userId: userId }
    });

    if (!finData) {
      return NextResponse.json(
        { success: false, message: "Financial data not found" },
        { status: 404 }
      );
    }

    const salary = finData.salary;
    const statusData = calculateEmergencyStatus(emergencyFund, salary);

    const newRecord = await prisma.emergencyFund.create({
      data: {
        userId,
        emergencyFund,
        status: statusData.status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Emergency fund created successfully",
        data: {
          record: newRecord,
          analysis: statusData,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating emergency fund", error },
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
      where: { userId: userId }
    });
    
    const data = await prisma.emergencyFund.findFirst({
      where: { userId: userId },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Emergency fund not found" },
        { status: 404 }
      );
    }

    const salary = finData?.salary;
    const emergencyFund = data?.emergencyFund;
    let emergencyFundStatus = null;
    
    if (emergencyFund && salary) {
      emergencyFundStatus = calculateEmergencyStatus(emergencyFund, salary);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Emergency fund found",
        data: data,
        emergencyFundAmount: formatAmount(data.emergencyFund),
        emergencyFundStatus: emergencyFundStatus
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching data", error },
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
    const emergencyFund = Number(data.emergencyFund) || 0;

    // Get user's salary from financials
    const finData = await prisma.financials.findFirst({
      where: { userId: userId }
    });

    if (!finData) {
      return NextResponse.json(
        { success: false, message: "Financial data not found" },
        { status: 404 }
      );
    }

    const salary = finData.salary;
    const statusData = calculateEmergencyStatus(emergencyFund, salary);

    // Update or create emergency fund
    const updatedRecord = await prisma.emergencyFund.upsert({
      where: { userId: userId },
      update: {
        emergencyFund,
        status: statusData.status,
      },
      create: {
        userId,
        emergencyFund,
        status: statusData.status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Emergency fund updated successfully",
        data: {
          record: updatedRecord,
          analysis: statusData,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error updating emergency fund", error },
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

    // Check if emergency fund exists
    const existingFund = await prisma.emergencyFund.findFirst({
      where: { userId: userId }
    });

    if (!existingFund) {
      return NextResponse.json(
        { success: false, message: "Emergency fund not found" },
        { status: 404 }
      );
    }

    // Delete the emergency fund
    await prisma.emergencyFund.delete({
      where: { userId: userId }
    });

    return NextResponse.json(
      { success: true, message: "Emergency fund deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting emergency fund", error },
      { status: 500 }
    );
  }
} 