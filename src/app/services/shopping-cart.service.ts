import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/products';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  url: string;
  constructor(private db: AngularFireDatabase) { 
    this.url = "/shopping-carts"
  }

  addToCart(product: Product){
   this.updateItem(product, 1);
  }

  removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateId();
    return this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateId();
    return this.db.object('/shopping-carts/' + cartId)
           .valueChanges().pipe(map ((data:any)=>{
              let param = data? data.items : {}
              return new ShoppingCart(param);
           }))
  }

  private getItem(cartId: string, productKey: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productKey);
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    }) 
  }
 
  private async getOrCreateId(): Promise<string>{
    let cartId = localStorage.getItem("cartId");
    if (cartId){
      return cartId;
    }

    let result = await this.create();
    localStorage.setItem('cartId',  result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateId();
    
    let item$ = this.getItem(cartId, product.key);
     
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      const itemPayload:any = item.payload.val();

      const quantity = (itemPayload ? itemPayload.quantity : 0) + change;
      
      if (quantity == 0){
        item$.remove();
        return;
      }
      
      item$.update({
        title: product.title,
        price: product.price,
        // category: product.category,
        imgUrl: product.imgUrl,
        quantity: quantity
      });
      });
    }
    
}
