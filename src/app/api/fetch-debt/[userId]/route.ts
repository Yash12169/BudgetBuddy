import { PrismaClient } from "@prisma/client";
import { NextResponse,NextRequest } from "next/server";
const prisma = new PrismaClient();
const calculateDebtScore=()=>{

}
export async function GET(req: NextRequest,{params}:{params:{userId:string}}) {
  try {
    const userId = Number(params.userId);
    if(isNaN(userId)) return NextResponse.json({success: false,message:"invalid ID"},{status: 400})
    const data = await prisma.debt.findMany({
      where: { userId: userId },
    });
    if(!data){
      return NextResponse.json({success: false,message: "data not found"},{status: 500})
    }
    const  emiAmount  = data[0].emiAmount;
    const financialData = await prisma.financials.findUnique({
      where:{id: userId} 
    })

    if(!financialData ) return NextResponse.json({success: false, message: "data missing please try again"},{status: 500})
    const salary = financialData.salary
   


    const debtLoad = parseFloat(((emiAmount/salary)*100).toFixed(2))
    console.log(debtLoad);
    return NextResponse.json(
      { success: true, message: "data fetched successfully",data:{data: data,debtLoad: debtLoad},financialData:financialData },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
