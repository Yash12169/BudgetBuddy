import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
      include: {financial: true,debt: true},
    });
    if (!user)
      return NextResponse.json(
        { success: false, message: "user not found" },
        { status: 400 }
      );

    return NextResponse.json(
      { success: true, message: "user found", user: user },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    
    const { firstName, lastName } = data;
    
    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, message: "firstName and lastName are required" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: String(id) },
      data: {
        firstName: firstName,
        lastName: lastName,
      },
      include: {financial: true,debt: true},
    });

    return NextResponse.json(
      { success: true, message: "user updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
