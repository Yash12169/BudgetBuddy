import { NextRequest } from "next/server";
export async function post(req: NextRequest) {
    try{
        const data = await req.json()
        console.log(data)
    }
}