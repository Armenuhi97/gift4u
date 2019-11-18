import { Video } from "../home/home.models";

export interface OrderHistory {
    order: Order[];
}

export interface Order {
    address: string;
    billing_address_id: string;
    billing_company_id: string;
    carrier_id: number;
    cartRuleId: number | string;
    cartRulePrice: string;
    cityCountryId: number | string;
    cityPriceId: number | string;
    comment: string;
    created_at: string;
    currency_id: number;
    deliveriPrice: string;
    delivery_date: string;
    email: string;
    fullName: string;
    id: number;
    index: string;
    invoice_date: string;
    invoice_no: string;
    isCash: number;
    isPaid: number;
    packetin: string;
    packeting: string;
    packetingTotal: string;
    paymentOrderId: number;
    phone: string;
    priceOrderWhitPercent: string;
    priceWithoutSale: string;
    shipping_address_id: number | string;
    shipping_no: number | string;
    status_id: number;
    total: string;
    total_discount: string | number;
    total_discount_tax: string | number;
    total_shipping: string | number;
    total_shipping_tax: string | number;
    total_tax: string | number;
    updated_at: string;
    user_id: number;
    products: OrderProducts[];
}

export interface OrderProducts {
    active: number;
    alt: string;
    attribute_set_id: number;
    brandId: number;
    cityId: number;
    combineId: number;
    comment: string;
    composition: string;
    count: number;
    created_at: string;
    description: string;
    fullDescription: string;
    group_id: number;
    id: number;
    image: string;
    inputId: number;
    keywords: string;
    name: string;
    orderId: number;
    price: string;
    priceInput: string;
    price_with_vat: number;
    productId: number;
    sku: string;
    smallImage: string;
    statusId: number;
    stock: number;
    tax_id: number;
    title: string;
    updated_at: string;
    video: string | Video;
    weight: string;
}