import { Component, OnInit, Input, AfterViewInit, DoCheck } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements DoCheck {
 
  @Input() product: Product;
  @Input('show-actions') showActoin = true; 
  @Input('shopping-cart') cart: ShoppingCart;
  @Input('preview-only') previewOnly = false;

  coverImgUrl: string;
  constructor(private cartService: ShoppingCartService,
              private router: Router) {
  }
  
  ngDoCheck() {
    if (!this.coverImgUrl) this.coverImgUrl = this.product.imgUrl;
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  updateCoverImage(url){
    this.coverImgUrl = url;
  }

  click(key){
    this.router.navigate(['/product/details/', key])
  }
}
