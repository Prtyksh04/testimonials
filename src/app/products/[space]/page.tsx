import SpacePage from "@/app/Components/products/Products"
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import NotAuthenticated from "@/app/Components/NotAuthenticated";
const SpacePageComponent = async function({ params }: { params: { space: string } }) {
    const session = await getServerSession(AuthOptions);
    if(!session || !session.user?.email){
        return (
            <NotAuthenticated />
        )
    }
    return (
        <SpacePage space={params.space} />
    );
};

SpacePageComponent.displayName = 'SpacePageComponent';

export default SpacePageComponent;
