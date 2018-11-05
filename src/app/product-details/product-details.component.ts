import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/products';
import { ProductService } from '../services/product-service.service';
import { take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  id: string;
  cart : ShoppingCart;


  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService) { 
              }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    
   (await this.cartService.getCart()).subscribe(c=> this.cart = c);

    this.productService.get(this.id).subscribe( (p:any) =>{
        this.product = p;
        console.log("prduct: ", p);
        this.product['key'] = this.id;
      });
    
  }

  addToCart(){
  
    this.cartService.addToCart(this.product);
    //console.log(this.cart$.);
  }

}
