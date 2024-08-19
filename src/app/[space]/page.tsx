import TestimonialPage from "@/app/Components/TestimonialSpacePage/TestimonialSpacePage";
import prisma from "@/db";

async function getSpaceContent(spaceName: string) {
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
        return spaceContent || { headerTitle: '', customMessage: '', questions: [] }; // Default return if no data
    } catch (error) {
        console.error("Error fetching Space Content:", error);
        return { headerTitle: '', customMessage: '', questions: [] }; // Default return on error
    }
}

export default async function Page({ params }: { params: { space: string } }) {
    const spaceContent = await getSpaceContent(params.space);
    return (
        <TestimonialPage
            headerTitle={spaceContent.headerTitle}
            customMessage={spaceContent.customMessage}
            questions={spaceContent.questions}
            spaceName={params.space}
        />
    );
}
