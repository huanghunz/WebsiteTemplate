import { Address } from "./address"
import { ShoppingCart } from "./shopping-cart";

export class Order{
    datePlaced: string;
    items: any[];
    shipping: Address;
    orderTotalPrice: number;

    constructor(public userId: string, 
        shipping: Address,
        cart: ShoppingCart ){
        this.datePlaced = new Date().toISOString();

        this.shipping = {...shipping}
        this.items = cart.items.map(i=>{
            return{
              product:{
                title: i.title,
                imgUrl:i.imgUrl,
                price: i.price,
                key: i.key,
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
        })
        this.orderTotalPrice = cart.totalPrice;
    }   
}