export interface Discount {
    date: Date;
    shops: Shop[];
}

export interface Shop {
    shopName: string;
    shopUrl: string;
    product: string;
    img: string;
    newPrice: string;
    oldPrice: string;
    availablePercentage: string | null;
    availableQuantity: string | null;
    totalQuantity: string | null;

}