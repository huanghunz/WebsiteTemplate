import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input() product: Product;
  
  @Input('shopping-cart') cart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { 
    
  }
  
  ngOnInit() {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
}
