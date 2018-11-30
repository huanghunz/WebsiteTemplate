import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService) { }

  async placeOrder(order){
    let r = await this.db.list('/orders/' + order.userId).push(order);
    this.cartService.clearCart();
    return r;
  }

  getOrders(){
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string){
    return this.db.list('/orders/' + userId).snapshotChanges()    
      .pipe(map(changes => {
        return changes.map(
          a => ({ key: a.key, ...a.payload.val() }))}));
  }
}
