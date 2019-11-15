import { Banner, Partner, Video } from "../views/main/home/home.models";
import { Category } from "../views/main/catalog/catalog.models";
import { TranslateService } from "../services";

export interface RequestParams {
    headers?;
    observe?;
    responseType?
}

export interface MenuItem {
    label: string;
    routerLink: string;
}

export interface ServerResponse<T> {
    status: number;
    messages: T;
    type?: number;
}
export interface ServerResponseWithCount<T> {
    status: number;
    messages: T;
    count: number
}
export interface AllSettings {
    banner: Banner[];
    category: Category[]
    menu: Category[]
    new: Product[]
    partners: Partner[]
    perfumes: ParfumeInfo
    popular: Product[]
    productvideos: Video[];
    settings: Setting[]
    socialNetworks: SocialItem[]
    special: Product[]
}
export interface LoginResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
export interface ProductStatus {
    created_at: null
    id: number
    name: string
    productId: number
    statusId: number
    updated_at: null
}
export class Product {
    active: number;
    attribute_set_id: number;
    category_id: number;
    created_at: string;
    description: string;
    group_id: number;
    id: number;
    name: string;
    price: string;
    mainImage: ProductImage | null;
    productImages: ProductImage[];
    product_id: number;
    sku: string;
    stock: number;
    tax_id: number;
    updated_at: string;
    price_with_vat: string;
    cityId: number;
    brandId: number;
    duration_of_preparation: number;
    attributeSet: AttributeSet[];
    specificPrice: number;
    count?: number;
    brandName: string;
    image: string;
    smallImage: string;
    productScore: ProductScore[];
    countProduct: string;
    alt: string;
    promoDiscount?: number;
    discountType?: string;
    both?: number;
    status: ProductStatus[];
    isHaveBoth: boolean;
    is_post: any
    constructor() {
        this.active = 0;
        this.attribute_set_id = 0;
        this.category_id = 0;
        this.created_at = '';
        this.description = '';
        this.group_id = 0;
        this.id = 0;
        this.name = '';
        this.price = '';
        this.productImages = [];
        this.product_id = 0;
        this.sku = '';
        this.stock = 0;
        this.tax_id = 0;
        this.updated_at = '';
        this.price_with_vat = '';
        this.cityId = 0;
        this.brandId = 0;
        this.specificPrice = 0;
        this.count = 0;
        this.brandName = '';
        this.image = '';
        this.smallImage = '';
        this.productScore = [];
        this.countProduct = '';
        this.alt = '';
        this.promoDiscount = 0;
        this.discountType = '';
        this.both = -1;
        this.status = [];
        this.isHaveBoth = false;
        this.duration_of_preparation = 0;
        this.is_post = null
    }
}
export interface CombinedAttribute {
    attribute_id: string;
    values: { value: string, fullName: string, available: boolean }[];
    name: string
}
export interface CombinedProduct {
    product_id: string
    values: { id: string; value: string }[]
}
export interface CombineProductAttribute {
    ProductAttribute: AttributeProductValue[]
    attribute_id: string
}
export interface LikeProduct {
    CombineProductAttribute: CombineProductAttribute[];
    productId: string
}
export interface AttributeValue {
    attribute_id: string
    value: string
    id: string
}

export interface AttributeProductValue {
    attribute_id: string
    product_id: string
    value: string
}

export interface AttributeSet {
    AttributeProductValue: AttributeProductValue[]
    attribute_id: string
    attribute_set_id: string
    attributes_value: AttributeValue[]
    id: number
    name: string
    type: string
}
export class ProductFull {
    active: number;
    alt: string;
    attributeSet: AttributeSet[];
    attributeSetsId: number;
    attributeSetsName: string;
    attribute_set_id: number;
    brandId: number;
    brandName: string;
    cityId: number;
    cityName: string;
    created_at: string;
    description: string
    fullDescription: string;
    group_id: number;
    id: number;
    duration_of_preparation: number;
    keywords: string;
    name: string;
    price: string;
    productComment: any[]
    productImages: any[]
    productScore: ProductScore[]
    sku: string;
    stock: number;
    tax_id: number;
    title: string
    updated_at: string
    image: string | null;
    likeProduct: LikeProduct[]
    combineAttribute: AttributeSet[]
    similarProducts: ProductFull[];
    price_with_vat: string;
    smallImage: string;
    path: Path[];
    countProduct: string;
    specificPrice: string;
    constructor() {
        this.active = 0;
        this.alt = '';
        this.attributeSet = [];
        this.attributeSetsId = 0;
        this.attributeSetsName = '';
        this.attribute_set_id = 0;
        this.brandId = 0;
        this.brandName = '';
        this.cityId = 0;
        this.cityName = '';
        this.created_at = '';
        this.description = '';
        this.fullDescription = '';
        this.group_id = 0;
        this.id = 0;
        this.keywords = '';
        this.name = '';
        this.price = '';
        this.productComment = [];
        this.productImages = [];
        this.productScore = [];
        this.sku = '';
        this.stock = 0;
        this.tax_id = 0;
        this.title = '';
        this.updated_at = '';
        this.image = '';
        this.price_with_vat = '';
        this.path = [];
        this.smallImage = '';
        this.duration_of_preparation = 0;
        this.countProduct = '';
        this.specificPrice = '';
    }
}

export interface ProductScore {
    score: string
}

interface ProductImage {
    id: number;
    name: string;
    order: number;
    product_id: number;
}

export interface ParfumeInfo {
    id: number;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
    title: string;
}

export interface Breadcrumbs {
    label: string;
    status: string;
    url: string;
    queryParams: any;
}

export interface Translate {
    [key: string]: string
}

export interface CityCountry {
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
    region: number;
}

export interface Setting {
    active: string;
    created_at: string;
    description: string;
    field: string;
    id: number;
    key: string;
    name: string;
    updated_at: string;
    value: string;
    isPage: string;
    map?: Setting
}

export interface Announcement {
    active: string;
    announcmentTypeId: string;
    created_at: string;
    description: string;
    fullDescription: string;
    fullKeywords: string;
    id: number;
    image: string;
    keywords: string;
    title: string;
    updated_at: string;
}

export interface AnnouncementType {
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
}

export interface SocialItem {
    created_at: string;
    id: number;
    image: string;
    link: string;
    updated_at: string;
}

export interface Path {
    categoryId: number;
    name: string;
}

export interface Loading {
    show: boolean
}

export class User {
    active: number;
    address: string;
    balance: string;
    birthday: string;
    cityCountriesName: string;
    cityCountryId: number;
    created_at: string;
    email: string;
    gender: number;
    id: number;
    index: number;
    name: string;
    percent: string;
    phone: string;
    priceWithBonus: string;
    salutation: string;
    updated_at: string;
    basketPrice: number;
    orderSum: number;
    profile_image: string

    constructor() {
        this.active = 0;
        this.address = '';
        this.balance = '';
        this.birthday = '';
        if (localStorage.getItem('language_key')) {
            this.cityCountriesName = JSON.parse(localStorage.getItem('language_key')) == 'arm' ? 'Գյումրի' : JSON.parse(localStorage.getItem('language_key')) == 'ru' ? 'Гюмри' : 'Gyumri';
        } else {
            this.cityCountriesName = 'Գյումրի'
        }
        this.cityCountryId = 1;
        this.created_at = '';
        this.email = '';
        this.gender = -1;
        this.id = 0;
        this.index = 0;
        this.name = '';
        this.percent = '';
        this.phone = '';
        this.priceWithBonus = '';
        this.salutation = '';
        this.updated_at = '';
        this.basketPrice = 0;
        this.orderSum = 0;
        this.profile_image = ''
    }
}
export interface Addresses {
    address: string
    cityCountriesName: string
    cityCountryId: number
    created_at: string
    fullName: string
    id: number
    index: string
    name: string
    phone: string
    status: string
    updated_at: string
    user_id: number
    showOrHide?: boolean,
    icon: string
}
export interface Bookmark {
    active: number
    alt: string
    attributeSet: Array<{
        AttributeProductValue: []
        attribute_id: number
        attribute_set_id: number
        id: number
        name: string
        theareSame: null
        type: string
    }>
    attributeSetsId: number
    attributeSetsName: string
    attribute_set_id: number
    brandId: number
    brandName: string
    cityId: number
    combineId: null
    composition: string
    countProduct: string
    created_at: string
    description: string
    fullDescription: string
    group_id: number
    id: number
    image: string
    keywords: string
    name: string
    price: string
    price_with_vat: number
    productId: number
    productImages: []
    productScore: []
    sku: string
    smallImage: string
    specificPrice: null
    stock: number
    tax_id: number
    title: string
    updated_at: string
    video: null
    weight: null
}
export interface PaymentHistory {
    bonus: string
    carriersName: string
    date: string
    isPaid: number
    orderId: number
    packetin: string
    paymentOrderId: string
    priceOrderWhitPercent: string
    priceWithoutSale: string
    statusName: string
    total: string
    user_id: number
    isCash: number
    cashTitle: string
}
export interface BonusPoint {
    bonus: string
    created_at: string
    id: number
    order: string
    orderId: number
    percent: string
    status: string
    total: string
    updated_at: string
    user_id: number
}
export interface Day {
    day: number
}
export interface Month {
    text: string,
    id: number
}
export interface Year {
    year: number
}
export interface ModalFilterType {
    priceMin?: number
    priceMax?: number
    reduction?: string
    cityId?: string
    brandsId?: string
    categoryId?: string
}
export interface Reviews {
    admin_answer: string
    advantages: string
    comments: string
    create_date: string
    created_at: string
    email: string
    id: number
    isActive: number
    limitations: number
    name: string
    productId: number
    updated_at: string
    user_id: number
    isShow?: boolean
    buttonText: string
    users: { profile_image: string }

}