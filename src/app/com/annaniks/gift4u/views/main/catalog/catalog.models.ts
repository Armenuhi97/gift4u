export { Brand } from 'src/app/com/annaniks/gift4u/views/main/brands/brands.models';

export interface Category {
    depth: number;
    id: number;
    lft: number;
    name: string;
    parent_id: number;
    parentcategoryname?: string;
    isSelect?: boolean;
    parentName: string;
    rgt: number;
    slug: string;
    subCategory?: Category[];
    isActive?:boolean
}

export class CategoryFilter {
    priceMin: number;
    priceMax: number;
    brandsId: any;
    cityId: any;
    reduction: any
    // attribut: FilterAttribut[];

    constructor() {
        this.priceMin = null;
        this.priceMax = null;
        this.brandsId =null;
        this.cityId = null;
        // this.attribut = null;
        this.reduction=null
    }
}

interface FilterAttribut {
    id?: number;
    value: string;
    name: string;
}

export interface AttributeFilter {
    id: number;
    type: string;
    name: string;
    attributValue: Attribute[];
}

interface Attribute {
    id: number,
    attribute_id: number,
    value: string;
}

export interface City {
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
    isSelect?: boolean
}
export interface Reduction {
    reduction: string
}

