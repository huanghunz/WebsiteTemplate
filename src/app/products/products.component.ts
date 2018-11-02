import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/products';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  filteredProducts;

  category: string;

  constructor(route: ActivatedRoute,
              private productService: ProductService) { 
              
    this.productService.getAll()
      .pipe(switchMap(
        (products: Product[])=> 
        { 
          this.products = products;
          return route.queryParamMap
        }))
        .subscribe(params=>{
          this.category = params.get('category');
          this.filteredProducts = (this.category) && this.products?
              this.products.filter(p=>p.category === this.category)
              : this.products
        })
  }

  ngOnInit() {
  }
}
