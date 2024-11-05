'use server'
import prisma from "@/db"

export async function createTestimonial(spaceName: string, starRating: number, content: string, name: string, email: string, type: 'VIDEO' | 'TEXT') {
    try {
        const createTestimonial = await prisma.testimonial.create({
            data: {
                spaceName: spaceName,
                starRating: starRating,
                content: content,
                name: name,
                email: email,
                type: type,
                permission: true,
                submittedAt: new Date()
            }
        });
        return createTestimonial;
    } catch (error) {
        console.error("Error Creating Testimonial : ", error);
        throw new Error("Error Creating Testimonial");
    }
}

export async function deleteTestimonial(id: number | undefined) {
    try {
        const deleteTestimonial = await prisma.testimonial.delete({
            where: {
                id
            }
        });
    } catch (error) {
        console.error("Error Creating Testimonial : ", error);
        throw new Error("Error Creating Testimonial");
    }
}

export async function getTestimonialContent(id: number | undefined) {
    console.log("Id in Server Action :  ", id);
    try {
        const TestimonialContent = await prisma.testimonial.findFirst({
            where: {
                id
            },
            select: {
                content: true,
                starRating: true,
                name: true,
                email: true,
                id:true,
            }
        });
        console.log("TestimonialContent : ", TestimonialContent);
        return TestimonialContent || { content: '', starRating: '', name: '', email: '' };
    } catch (error) {
        console.error("Error in Editing Testimonial : ", error);
        throw new Error("Error Editing Testimonial");
    }
}

export async function editTestimonial(id : number , content: string, starRating: number, email: string, name: string) {
    console.log(" id , content , starRating , name , email " , id ,  content , starRating , name , email);
    try {
        const  editTestimonialContent = await prisma.testimonial.update({
            where :{
                id
            },
            data :{
                content ,
                starRating,
                email,
                name,
            }
        })
        console.log("editTestimonialContent" , editTestimonialContent);
        return editTestimonial
    } catch (error) {
        console.error("Error in Editing Testimonial : ", error);
        throw new Error("Error Editing Testimonial");
    }
}


