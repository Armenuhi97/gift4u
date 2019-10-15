export interface ShippingPrice {
    price: string;
    priceForFree: string;
}

export interface CarrierType {
    delivery_text: string;
    fixPrice: string;
    id: number;
    logo: string;
    name: string;
    price: string;
    priceForFree: string;
}

export interface PromoCode {
    id: number;
    reduction_amount: string;
}