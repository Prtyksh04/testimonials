import SpacePage from "@/app/Components/products/Products"

export default async function({ params }: { params: { space: string } }){
    return (
        <SpacePage space={params.space}/>
    )
}