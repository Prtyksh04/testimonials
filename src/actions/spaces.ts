'use server'
import prisma from "@/db"
import {auth} from '@clerk/nextjs/server'
import { getServerSession } from "next-auth";
export async function createSpace(spaceName : string , headerTitle : string , customMessage : string , questions : string[]){
    try {
        // const {userId} = auth();
        const session = await getServerSession();
        if (!session || !session.user?.email) {
            throw new Error("User not authenticated");
        }
        const userEmail = session.user.email;
        const spaceCreated = await prisma.space.create({
            data :{
                spaceName,
                headerTitle,
                customMessage,
                questions,
                userEmail
            }
        });

        return spaceCreated;
    } catch (error) {
        console.error("Error Creating Spaces : " , error);
        throw new Error("Error Creating Space");
    }
}

export async function getSpaceContent(spaceName: string) {
    try {
        const getSpaceContent = await prisma.space.findFirst({
            where :{
                spaceName,
            },
            select :{
                headerTitle : true,
                customMessage : true,
                questions : true,
            }
        });
        return getSpaceContent|| { headerTitle: '', customMessage: '', questions: [] }; 
    } catch (error) {
        console.error("Error Creating Testimonial : ", error);
        throw new Error("Error Creating Testimonial");
    }
}

export async function editSpaceContent(spaceName : string , headerTitle : string , customMessage : string , questions : string[] ){
    const editSpaceContent = await prisma.space.update({
        where :{
            spaceName,
        },
        data :{
            headerTitle,
            customMessage,
            questions,
        }
    })
    return editSpaceContent;
}