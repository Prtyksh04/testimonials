import SpacePage from "@/app/Components/products/Products"

const SpacePageComponent = async function({ params }: { params: { space: string } }) {
    return (
        <SpacePage space={params.space} />
    );
};

SpacePageComponent.displayName = 'SpacePageComponent';

export default SpacePageComponent;
