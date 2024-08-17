import { NextRequest , NextResponse } from "next/server";
import prisma from "@/db";
import {auth} from "@clerk/nextjs/server";

export async function POST(req:NextRequest){
    try {
        const {spaceName , headerTitle , customMessage,questions} = await req.json();
        const {userId} = auth();
        if(!userId){
            return NextResponse.json({message : 'Unauthorized'} , {status :401});
        }
        const createSpace = await prisma.space.create({
            data :{
                spaceName,
                headerTitle,
                customMessage,
                questions,
                userId,
            }
        });
        return NextResponse.json(createSpace);
    } catch (error) {
        return NextResponse.json({message : "Error creating Space"} , {status : 500});
    }
}