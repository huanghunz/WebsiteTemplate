import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/products';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

import { HostListener } from "@angular/core";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  products: Product[];
  filteredProducts: Product[];;

  category: string;
  cart$: Observable<ShoppingCart>;

  screenHeight: number;
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      console.log("h: " , window.innerHeight, " w" , window.innerWidth)
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
}

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService) { 
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();

    this.populateProducts();

    this.onResize();
  }

  private populateProducts(){

    this.productService.getAll()
    .pipe(switchMap((products: Product[])=> 
      { 
        this.products = products;
        return this.route.queryParamMap;
      }))
    .subscribe(params=>{
        this.category = params.get('category');
        this.applyFilter();
      })
  }

  private applyFilter(){
    this.filteredProducts = (this.category) && this.products?
                            this.products.filter(p=>p.category === this.category)
                            : this.products
  }

}
