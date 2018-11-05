import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @Input() product: Product;
  @Input('show-actions') showActoin = true; 
  @Input('shopping-cart') cart: ShoppingCart; 

  constructor(private cartService: ShoppingCartService) { 
  }
  
  ngOnInit() {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  click(){
    console.log("click");
  }
}
