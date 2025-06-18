import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const debt = await prisma.debt.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!debt) {
      return NextResponse.json(
        { error: "Debt details not found" },
        { status: 404 }
      );
    }

    // Get user's salary from financials
    const financials = await prisma.financials.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!financials) {
      return NextResponse.json(
        { error: "Financial details not found" },
        { status: 404 }
      );
    }

    // Calculate EMI load as percentage of salary
    const debtLoad = (debt.emiAmount / financials.salary) * 100;

    return NextResponse.json({
      data: {
        data: debt,
        debtLoad: Math.round(debtLoad)
      }
    });
  } catch (error) {
    console.error("Error fetching debt:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new debt details for a user
export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const { loanAmount, loanTenure, interestRate, emiAmount } = body;

    // Validate required fields
    if (!loanAmount || !loanTenure || !interestRate || !emiAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if debt already exists for user
    const existingDebt = await prisma.debt.findUnique({
      where: {
        userId: userId,
      },
    });

    if (existingDebt) {
      return NextResponse.json(
        { error: "Debt details already exist for this user" },
        { status: 400 }
      );
    }

    const debt = await prisma.debt.create({
      data: {
        userId: userId,
        loanAmount,
        loanTenure,
        interestRate,
        emiAmount,
      },
    });

    // Get user's salary from financials
    const financials = await prisma.financials.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!financials) {
      return NextResponse.json(
        { error: "Financial details not found" },
        { status: 404 }
      );
    }

    // Calculate EMI load as percentage of salary
    const debtLoad = (debt.emiAmount / financials.salary) * 100;

    return NextResponse.json({
      data: {
        data: debt,
        debtLoad: Math.round(debtLoad)
      }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating debt:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update debt details for a user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const { loanAmount, loanTenure, interestRate, emiAmount } = body;

    // Validate required fields
    if (!loanAmount || !loanTenure || !interestRate || !emiAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const debt = await prisma.debt.update({
      where: {
        userId: userId,
      },
      data: {
        loanAmount,
        loanTenure,
        interestRate,
        emiAmount,
      },
    });

    // Get user's salary from financials
    const financials = await prisma.financials.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!financials) {
      return NextResponse.json(
        { error: "Financial details not found" },
        { status: 404 }
      );
    }

    // Calculate EMI load as percentage of salary
    const debtLoad = (debt.emiAmount / financials.salary) * 100;

    return NextResponse.json({
      data: {
        data: debt,
        debtLoad: Math.round(debtLoad)
      }
    });
  } catch (error) {
    console.error("Error updating debt:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete debt details for a user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    await prisma.debt.delete({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: "Debt details deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting debt:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 