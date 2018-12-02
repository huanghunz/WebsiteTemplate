import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService) { }

  async create(order){
    let r = await this.db.list("/orders/" + order.userId + "/orders")
                    .push(order);
    let rr = this.db.object("/orders");

  
    console.log("post order result: ", r);
    this.cartService.clearCart();
    return r;
  }

  getAll(){
    return this.db.list("/orders").snapshotChanges()    
        .pipe(map(changes => 
      changes.map(a => ({ key: a.key, ...a.payload.val() }))));
  }

  getByUserId(userId: string){
    return this.db.list("/orders/" + userId + "/orders").snapshotChanges()    
      .pipe(map(changes => {
        console.log(changes);
        return changes.map(
          a => ( { key: a.key, ...a.payload.val() }))}));
  }

  update(userId: string, orderId: string, order){
    console.log("updating order: " + userId + "  " + orderId, order)
    this.db.object("/orders/" + userId + "/orders/" + orderId).update(order);
  }

  delete(){

  }
}
