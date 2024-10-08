'use server'
import prisma from "@/db";
export async function getSpaceContent(spaceName: string) {
    try {
        const spaceContent = await prisma.space.findFirst({
            where: {
                spaceName: spaceName
            },
            select: {
                headerTitle: true,
                customMessage: true,
                questions: true,
            }
        });
        return spaceContent || { headerTitle: '', customMessage: '', questions: [] }; 
    } catch (error) {
        console.error("Error fetching Space Content:", error);
        return { headerTitle: '', customMessage: '', questions: [] };
    }
}

