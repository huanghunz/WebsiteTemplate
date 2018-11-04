import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/products';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
 
  products: Product[];
  filteredProducts: Product[];;

  category: string;
  cart : ShoppingCart;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService) { 
  }

  async ngOnInit() {
    this.subscription
      = (await this.cartService.getCart())
        .subscribe( (cart) => { this.cart = cart; })

    this.populateProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
