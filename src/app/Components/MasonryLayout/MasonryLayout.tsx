import React from "react";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import { Testimonial } from "@/types/types";


interface MasonryLayoutProps {
    testimonials: Testimonial[];
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ testimonials }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
        </div>
    );
};

export default MasonryLayout;
