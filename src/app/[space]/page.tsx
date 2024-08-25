import TestimonialPage from "@/app/Components/TestimonialSpacePage/TestimonialSpacePage";
import { getSpaceContent } from "@/actions/spaces";
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
