import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const salary = Number(data.salary) || 0;
    const expenses = Number(data.expenses) || 0;
    const extraExpenses = Number(data.extraExpenses) || 0;
    const insurancePremium = Number(data.insurancePremium) || 0;
    const emi = Number(data.emi) || 0;

    const newRecord = await prisma.financials.create({
      data: {
        userId: "1",
        salary,
        expenses,
        extraExpenses,
        insurancePremium,
        emi,
      },
    });

    console.log("Stored new financial data:", newRecord);

    return NextResponse.json(
      { success: true, message: "Financial data stored", data: newRecord },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error processing financial data:", err);
    return NextResponse.json(
      { success: false, message: "Failed to store data", error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data =await req.json();
    if (!data) {
      return NextResponse.json(
        { success: false, message: "data not found" },
        { status: 404 }
      );
    }
    const salary = data.income;
    const expenses = data.basic;
    const extraExpenses = data.extra;
    const insurancePremium = data.insurance;
    const id = data.userId;
    const emi = data.emi;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing record ID" },
        { status: 400 }
      );
    }
    const responseDebt = await prisma.debt.update({
      where:{userId:id},
      data:{
        emiAmount: emi,
      }
    })
    const response = await prisma.financials.update({
      where: {userId: id},
      data: {
        salary,
        expenses,
        extraExpenses,
        insurancePremium,
      },
    });
    return NextResponse.json(
      { success: true, message: "data updated successfully", data: {response,responseDebt} },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "something went wrong please try again later",
        error: error,
      },
      { status: 500 }
    );
  }
}
