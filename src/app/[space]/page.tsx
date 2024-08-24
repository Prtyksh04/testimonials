import TestimonialPage from "@/app/Components/TestimonialSpacePage/TestimonialSpacePage";
import prisma from "@/db";

export async function getSpaceContent(spaceName: string) {
    console.log("spaceName : " , spaceName);
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
        console.log("spaceContent : " , spaceContent);
        return spaceContent || { headerTitle: '', customMessage: '', questions: [] }; 
    } catch (error) {
        console.error("Error fetching Space Content:", error);
        return { headerTitle: '', customMessage: '', questions: [] };
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
