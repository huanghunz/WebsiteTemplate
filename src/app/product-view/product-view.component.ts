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
  @Input('shopping-cart') shoppongCart: ShoppingCart; 

  constructor(private cartService: ShoppingCartService) { 
  }
  
  ngOnInit() {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product)
  }

  getQuantity(){
    if (!this.shoppongCart) return 0;

    let item = this.shoppongCart.itemsMap[this.product.key];
   //console.log(this.shoppongCart, this.product.key);
    return item? item.quantity : 0;
  }

}
