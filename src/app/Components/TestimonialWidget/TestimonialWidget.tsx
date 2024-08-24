"use client"
import React , {useState , useEffect} from "react"
import MasonryLayout from "../MasonryLayout/MasonryLayout"

interface Testimonial {
    id : number;
    type: 'VIDEO' | 'TEXT';
    starRating: number;
    name: string;
    email: string;
    content?: string;
    videoUrl?: string
}

interface TestimonialWidgetProps {
    spaceName : string;
}

const TestimonialWidget : React.FC<TestimonialWidgetProps> = ({spaceName}) => {
    const [testimonals , setTestimonials] = useState<Testimonial[]>([]);

    useEffect(()=>{
        const fetchTestimonials = async()=>{
            const response = await fetch(`/api/testimonials?space=${spaceName}`, { method: 'GET' });
            const data: Testimonial[] = await response.json();
            console.log(testimonals);
            setTestimonials(data);
        }
        fetchTestimonials();
    },[spaceName]);
  return (
    <div className="my-8">
        <MasonryLayout testimonials={testimonals} />
    </div>
  )
}

export default TestimonialWidget;