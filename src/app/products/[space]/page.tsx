import SpacePage from "@/app/Components/products/Products"
export default async function({ params }: { params: { space: string } }){
    console.log("server pramas : ",params.space );
    return (
        <SpacePage space={params.space}/>
    )
}