import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
  try{
    const emergencyFund=await prisma.emergencyFund.findMany();
    return NextResponse.json({success:true,data:emergencyFund});
  }
  catch(err:any){
    return NextResponse.json(
      {success:false,message:err.message},{status:500}
    );
  }
}
interface EmergencyFundStatus {
  monthsCovered: number;
  status: 'critical' | 'danger' | 'warning' | 'moderate' | 'secure';
  message: string;
  recommendedMin: number;
  recommendedIdeal: number;
}

const calculateEmergencyStatus = (emergencyFund: number, salary: number): EmergencyFundStatus => {
  const monthsCovered = emergencyFund / salary;
  
  let status: EmergencyFundStatus['status'];
  let message: string;

  if (monthsCovered === 0) {
    status = 'critical';
    message = ' No emergency fund! Immediate risk if income stops';
  } 
  else if (monthsCovered < 1) {
    status = 'danger';
    message = `Only ${monthsCovered.toFixed(1)} month coverage - High risk`;
  }
  else if (monthsCovered < 3) {
    status = 'warning';
    message = ` ${monthsCovered.toFixed(1)} months - Build more savings`;
  }
  else if (monthsCovered < 6) {
    status = 'moderate';
    message = ` ${monthsCovered.toFixed(1)} months - Adequate coverage`;
  }
  else {
    status = 'secure';
    message = ` ${monthsCovered.toFixed(1)} months - Financially secure!`;
  }

  return {
    monthsCovered: parseFloat(monthsCovered.toFixed(1)),
    status,
    message,
    recommendedMin: 3,
    recommendedIdeal: 6
  };
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const userId = String(data.userId); 
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
          analysis: statusData
        }
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