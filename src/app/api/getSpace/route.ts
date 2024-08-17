import { NextResponse , NextRequest } from "next/server";
import prisma from "@/db";
import {auth} from "@clerk/nextjs/server"

export async function GET(req:NextRequest , res : NextResponse){
    try {
        const {userId} = auth();
        if(!userId){
            return NextResponse.json({message : "Unauthorized"},{status : 401});
        }

        const getSpace = await prisma.space.findMany({
            where :{
                userId : userId,
            },
            select:{
                spaceName:true,
                headerTitle:true,
                customMessage:true,
                questions:true,
                testimonials:true,
            }
        });
        return NextResponse.json(getSpace);
    } catch (error) {
        return NextResponse.json({message: "Error Geting Space"} , {status : 500});
    }
}