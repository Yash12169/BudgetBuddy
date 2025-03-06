import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON data from the request
    const data = await req.json();
    console.log("Received financial data:", data);
    
    // Process the data (in a real app, you'd save to database here)
    // For example with Prisma:
    // const result = await prisma.financialRecord.create({
    //   data: {
    //     userId: session.user.id, // You'd get this from auth
    //     salary: parseFloat(data.salary) || 0,
    //     basicExpenses: parseFloat(data.basicExpenses) || 0,
    //     insurance: parseFloat(data.insurance) || 0,
    //     emi: parseFloat(data.emi) || 0, 
    //     extraExpenses: parseFloat(data.extraExpenses) || 0,
    //   }
    // });
    
    // Return success response
    return NextResponse.json({ success: true, message: "Financial data received" }, { status: 200 });
  } catch (err) {
    console.log("Error processing financial data:", err);
    return NextResponse.json({ success: false, message: "Failed to process data" }, { status: 500 });
  }
}