import DashBoard from "@/app/Components/Dashboard/Dashboard";
import prisma from "@/db";
import { auth } from "@clerk/nextjs/server"

async function getspaces() {
    try {
        const { userId } = auth();
        if (!userId) {
            return [];
        }
        const spaces = prisma.space.findMany({
            where: {
                userId: userId,
            }, select: {
                spaceName: true,
                headerTitle: true,
                customMessage: true,
                questions: true,
                testimonials: true,
                id:true,
            }
        });
        return spaces;
    } catch (error) {
        console.error("Error Fetching Spaces : " , error);
        return [];
    }
}


export default async function () {
    const spaces = await getspaces();
    return (
        <DashBoard Spaces={spaces} />
    )
}