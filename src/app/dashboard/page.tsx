import DashBoard from "@/app/Components/Dashboard/Dashboard";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/options";


async function getSpaces(userEmail: string) {
    try {
        const spaces = await prisma.space.findMany({
            where: {
                userEmail
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
    const session = await getServerSession(AuthOptions);
    if (!session || !session.user?.email) {
        return <div>You need to sign in to access the dashboard.</div>;
    }
    const userEmail = session.user.email;
    const spaces = await getSpaces(userEmail as string);
    return (
        <DashBoard Spaces={spaces} />
    );
};

DashboardPage.displayName = "DashboardPage";

export default DashboardPage;
