import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private db: AngularFireDatabase) { }

  
  create(product){
    return this.db.list('/products').push(product);
  }

  getAll() {  
    return this.db.list('/products')
        .snapshotChanges()    
        .pipe(map(actions => 
            actions.map(a => ({ key: a.key, ...a.payload.val() }))));
  }

  get(productId) {
    let a = this.db.object('/products/' + productId).valueChanges();
    console.log("id: ", productId, " a: " , a);
    return a;
  }
}
