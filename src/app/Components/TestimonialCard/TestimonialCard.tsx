import React from "react";
import VideoJS from "../VideoPlayer";

interface Testimonial {
    type: 'VIDEO' | 'TEXT';
    starRating: number;
    name: string;
    email: string;
    content?: string;
    videoUrl?: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <div
            className={`bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center ${
                testimonial.type === 'VIDEO' ? 'h-[auto]' : 'h-[auto]'
            }`}
            style={{ minHeight: testimonial.type === 'VIDEO' ? '300px' : '200px' }}
        >
            {testimonial.type === 'VIDEO' ? (
                <VideoJS videoUrl={testimonial.videoUrl} height={150} width={200}/>
            ) : (
                <div className="text-white mt-2">
                    <p>{testimonial.content}</p>
                </div>
            )}
            <h3 className="text-lg font-semibold text-white mt-4">{testimonial.name}</h3>
            <div className="text-sm text-gray-400">{testimonial.email}</div>
            <div className="mt-2 flex justify-center">
                {Array.from({ length: testimonial.starRating }).map((_, i) => (
                    <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L1 7.36l6.561-.955L10 1l2.439 5.405L19 7.36l-4.244 4.184 1.122 6.545z" />
                    </svg>
                ))}
            </div>
        </div>
    );
};

export default TestimonialCard;
