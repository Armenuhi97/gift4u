export interface Banner {
    id: number;
    name: string;
    image: string;
    content: string;
    link: string;
    created_at: string;
    updated_at: string;
}

export interface Partner {
    created_at: string;
    id: number;
    image: string;
    link: string;
    updated_at: string;
}

export interface Video {
    created_at: string;
    id: number;
    link: string;
    name: string;
    updated_at: string
}

interface VideoLink {
    id: string;
    image: string;
    provider: string;
    title: string;
    url: string;
}