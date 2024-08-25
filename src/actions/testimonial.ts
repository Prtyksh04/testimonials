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
            where :{
                id
            }
        });
    } catch (error) {
        console.error("Error Creating Testimonial : " , error);
        throw new Error("Error Creating Testimonial");
    }
}


