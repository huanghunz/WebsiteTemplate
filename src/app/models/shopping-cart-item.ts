import { Product } from "./products";

export class ShoppingCartItem{
   
    key: string;
    title: string;
    imgUrl: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }

    get totalPrice(): number { return this.price * this.quantity}
}