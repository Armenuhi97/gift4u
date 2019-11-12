export interface Brand {
    cityId: string;
    created_at: string;
    description: string;
    id: number;
    image: string;
    keywords: string;
    name: string;
    prioritet: number;
    title: string;
    updated_at: string;
    images: Images[]
}
export interface Images {
    brand_id: number
    created_at: null
    id: number
    name: string
    order: number
    updated_at: null
}
