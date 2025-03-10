import { PrismaClient } from "@prisma/client";
import { NextRequest,NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function POST(req: NextRequest) {

  try{
    const data = await req.json()
    const userId = 1;
    const loanAmount = Number(data.loanAmount) || 0;
    const loanTenure = Number(data.loanTenure) || 0;
    const interestRate = Number(data.interestRate) || 0;
    const emiAmount = Number(data.emiAmount)
    console.log(prisma.debt)

    const newRecord = await prisma.debt.create({
       data:{
        userId,
        loanAmount,
        loanTenure,
        interestRate,
        emiAmount
       }
    });
    return NextResponse.json({success: true, message:"debt data stored",data: newRecord},{status: 201})


  }
  catch(err:any){
    return NextResponse.json({success: false, message: err.message},{status: 500})
  }
 
  
}
