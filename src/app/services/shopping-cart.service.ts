import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProductFormComponent } from '../admin/product-form/product-form.component';
import { Product } from '../models/products';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  url: string;
  constructor(private db: AngularFireDatabase) { 
    this.url = "/shopping-carts"
  }

  addToCart(product: Product){
   this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

  async getCart(){
    let cartId = await this.getOrCreateId();
    return this.db.list('/shopping-carts/' + cartId);
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

  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateId();
    const item = this.getItem(cartId, product.key);
    item.snapshotChanges().pipe(take(1)).subscribe((i: any) => {
      const quantity = !i.payload? 0 : 
                      !i.payload.val()? 0:
                      i.payload.val().quantity || 0;
      item.update(
        { product:product, quantity: quantity + change });
    }); 
  }
}
