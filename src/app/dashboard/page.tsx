import DashBoard from "@/app/Components/Dashboard/Dashboard";
import prisma from "@/db";
import { auth } from "@clerk/nextjs/server";

async function getSpaces() {
    try {
        const { userId } = auth();
        if (!userId) {
            return [];
        }
        const spaces = await prisma.space.findMany({
            where: {
                userId: userId,
            },
            select: {
                spaceName: true,
                headerTitle: true,
                customMessage: true,
                questions: true,
                testimonials: true,
                id: true,
            },
        });
        return spaces;
    } catch (error) {
        console.error("Error Fetching Spaces: ", error);
        return [];
    }
}

const DashboardPage = async function () {
    const spaces = await getSpaces();
    return (
        <DashBoard Spaces={spaces} />
    );
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
