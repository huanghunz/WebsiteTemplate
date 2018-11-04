
import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./products";

export class ShoppingCart{
   items: ShoppingCartItem[] = []

   itemsCount: number = 0;
   totalPrice: number = 0;

   constructor(private itemsMap: {[productId: string]: ShoppingCartItem}){
    this.itemsMap = itemsMap || {};
    for (let id in this.itemsMap){
        let item = this.itemsMap[id];
        let cartItem = new ShoppingCartItem({ ...item, key: id});
        this.items.push(cartItem);
        
        this.itemsCount += cartItem.quantity;
        this.totalPrice += cartItem.totalPrice;
    }
   }

  getQuantity(product: Product){
   
    let item = this.itemsMap[product.key];
    return item? item.quantity : 0;
  }
}