
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart{
   
   constructor(public items: ShoppingCartItem[]){

   }

   get itemsCount() : number{
       let count = 0;
        for (let id in this.items){
            count += this.items[id].quantity;
        }
        return count;
    }
}