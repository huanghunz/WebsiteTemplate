import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //create a variable with type of Observable
  // because snapshotChanges returns a observable type.
  observableCategories$: Observable<any>; 
  
  // inject angular firedata base object for
  // communicating with firebase db
   constructor(private db: AngularFireDatabase) {
  // get all the list of data from 
     this.observableCategories$ 
        = this.db.list('/categories', ref => ref.orderByChild('name'))
       .snapshotChanges();
 
  }

   // now map your category key with data here
  getCategories() {
     return this.observableCategories$.pipe(map(changes => {

       return changes.map(c => { console.log("c: ", c); 
      return  ( 
         { key: c.payload.key, ...c.payload.val() })});
     }));
   }
 }