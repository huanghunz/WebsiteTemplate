import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../../services/product-service.service';
import { Subscription } from 'rxjs';
import { Product } from './../../models/products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  // For searching/filtering feature, can not use an observable
  // products$;

  products: Product[];
  filteredProducts: Product[];

  subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll()
    .subscribe((products: Product[]) => this.filteredProducts = this.products = products);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query){
    //console.log(query);
    query = query.toLowerCase();
    this.filteredProducts = (query)?
      this.products.filter(p => p.title.toLowerCase().includes(query)) : this.products

  }
}