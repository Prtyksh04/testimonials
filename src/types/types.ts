export interface spaceContent {
    headerTitle: string
    customMessage: string
    questions: string[]
    spaceName: string,
}

export interface spaces {
    id: number,
    spaceName: string,
    headerTitle: string,
    customMessage: string,
    questions: string[],
    testimonials?: {
        id: number;
        spaceName: string;
        starRating: number;
        content: string | null;
        name: string;
        email: string;
        videoUrl: string | null;
        submittedAt: Date;
    }[];
}

export interface FormData {
    spaceName: string;
    headerTitle: string;
    customMessage: string;
    questions: string[];
}

export interface SpacePageProps {
    headerTitle?: string
    customMessage?: string
    questions?: string[]
    space: string
}

export type Testimonial = {
    type: 'VIDEO' | 'TEXT';
    id: number;
    spaceName: string;
    starRating: number;
    content?: string; 
    name: string;
    email: string;
    videoUrl?: string;
    submittedAt: Date;
    permission: boolean;
};


