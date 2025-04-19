// import { PrismaClient } from "@prisma/client";
// import { NextRequest,NextResponse } from "next/server";
// const prisma = new PrismaClient()
// export async function POST(req: NextRequest) {

//   try{
//     const data = await req.json()
//     const userId = 1;
//     const loanAmount = Number(data.loanAmount) || 0;
//     const loanTenure = Number(data.loanTenure) || 0;
//     const interestRate = Number(data.interestRate) || 0;
//     const emiAmount = Number(data.emiAmount)
//     console.log(prisma.debt)

//     const newRecord = await prisma.debt.create({
//        data:{
//         userId,
//         loanAmount,
//         loanTenure,
//         interestRate,
//         emiAmount
//        }
//     });
//     return NextResponse.json({success: true, message:"debt data stored",data: newRecord},{status: 201})


//   }
//   catch(err:any){
//     return NextResponse.json({success: false, message: err.message},{status: 500})
//   }
 
  
// }
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const debts = await prisma.debt.findMany();
    return NextResponse.json({ success: true, data: debts });
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

    const { userId, loanAmount, loanTenure, interestRate, emiAmount } = data;

    if (!userId || !loanAmount || !loanTenure) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newDebt = await prisma.debt.create({
      data: {
        userId: String(userId),
        loanAmount: Number(loanAmount),
        loanTenure: Number(loanTenure),
        interestRate: Number(interestRate) || 0,
        emiAmount: Number(emiAmount) || 0,
      },
    });

    return NextResponse.json(
      { success: true, data: newDebt },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

