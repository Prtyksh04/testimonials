import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const space = searchParams.get('space');

    if (!space) {
        return NextResponse.json({ error: 'Space parameter is required' }, { status: 400 });
    }

    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { spaceName: space },
            select: {
                type: true,
                starRating: true,
                name: true,
                email: true,
                content: true,
                submittedAt: true
            }
        });

        return NextResponse.json(testimonials);
    } catch (error) {
        console.error('Error Fetching Testimonials:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
