import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private db: AngularFireDatabase) { }

  
  create(product){

    let date = new Date().toISOString();
    let endIdx = date.indexOf('T');
    product['date'] = date.substr(0, endIdx);
    console.log("proc: ", product['date']);
    return this.db.list('/products').push(product);
  }

  getAll() {  
    return this.db.list('/products')
        .snapshotChanges()    
        .pipe(map(changes => 
          changes.map(a => ({ key: a.key, ...a.payload.val() }))));
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, productNew){
    // Note: the productNew should not have an id field as id should not be updated.
    this.db.object('/products/' + productId).update(productNew);
  }

  delete(productId){
    this.db.object('/products/' + productId).remove();
  }
}
