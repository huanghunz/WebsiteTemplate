
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart{
   items: ShoppingCartItem[] = []
   constructor(public itemsMap: {[productId: string]: ShoppingCartItem}){
    for (let id in this.itemsMap){
        this.items.push(this.itemsMap[id])
    }
   }

   get itemsCount() : number{
       let count = 0;
        for (let id in this.itemsMap){
            count += this.itemsMap[id].quantity;
        }
        return count;
    }
}