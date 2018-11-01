import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../../services/product-service.service';
import { Subscription } from 'rxjs';
import { Product } from './../../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  // For searching/filtering feature, can not use an observable
  // products$;

  products: Product[];

  headers = ['date', 'title', 'price', 'category']

  subscription: Subscription;

  constructor(private productService: ProductService,
              private router: Router) { 
    this.subscription = this.productService.getAll()
    .subscribe((products: Product[]) =>  this.products 
    = products.sort((a, b)=>(a.title > b.title)? 1 : 0));
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

   edit(key){
     //console.log("admi: " + key);
     this.router.navigate(['/admin/products/', key])
   }
}