'use server'
import prisma from "@/db"
import {auth} from '@clerk/nextjs/server'
export async function createSpace(spaceName : string , headerTitle : string , customMessage : string , questions : string[]){
    try {
        const {userId} = auth();
        if (!userId) {
            throw new Error("User not authenticated");
        }
        const spaceCreated = await prisma.space.create({
            data :{
                spaceName,
                headerTitle,
                customMessage,
                questions,
                userId,
            }
        });

        return spaceCreated;
    } catch (error) {
        console.error("Error Creating Spaces : " , error);
        throw new Error("Error Creating Space");
    }
}