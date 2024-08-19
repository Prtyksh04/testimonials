import SpacePage from "@/app/Components/products/Products";
import prisma from "@/db";
async function getTestimonial(spaceName : string){
    try {
        const testimonials = await  prisma.testimonial.findMany({
            where :{
                spaceName : spaceName
            },
            select:{
                type :true,
                starRating:true,
                name:true,
                email:true,
                content:true,
                submittedAt:true
            }
        });
        return testimonials;
    } catch (error) {
        console.error("Error Fetching Testimonials : " , error);
        return [];
    }
}

export default async function({ params }: { params: { space: string } }){
    const testimonials = await getTestimonial(params.space);
    return (
        <SpacePage space={params.space} testimonial={testimonials}/>
    )
}