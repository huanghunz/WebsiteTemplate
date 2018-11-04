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

  quantity: number = 0;

  constructor(private cartService: ShoppingCartService) { 
    
  }
  
  ngOnInit() {
    this.updateQuantity();
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }

  updateQuantity(){
    this.quantity = this.cart.getQuantity(this.product);
  }


}
