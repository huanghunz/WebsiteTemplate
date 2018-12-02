import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  
  newProducts: Product[];

  screenHeight: number;
  screenWidth: number;

  constructor(
              private productService: ProductService) { 
  }

  async ngOnInit() {
   
    this.populateProducts();
  }

  private populateProducts(){

  this.productService.getAll()
              .subscribe((products: Product[]) => {
                
                this.newProducts = products.slice(products.length - 4);
              });
  }
}
