import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
