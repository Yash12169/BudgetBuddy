import { PrismaClient } from "@prisma/client";
import { NextResponse,NextRequest } from "next/server";
const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    try{
        const data = await req.json();
        const firstName = data.firstName;
        const lastName = data.lastName;
        const email = data.email;
        const password = data.password;
        const existingUser = await prisma.user.findUnique({
            where: {email: email}
        })

        if(existingUser){
            return NextResponse.json({success: false,message:"user already exists"}, {status: 400})
        }
        const user = await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password,
            }
        })

        return NextResponse.json({success: true, message: "user created successfully",user:user},{status: 201});
    }
    catch(error: any){
        return NextResponse.json({success: false,message: error.message},{status: 500})
    }
}
