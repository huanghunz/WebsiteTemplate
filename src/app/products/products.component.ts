import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { Product } from '../models/products';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { HostListener } from "@angular/core";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  products: Product[];
  filteredProducts: Product[];
  displayProducts: Product[];

  screenHeight: number;
  screenWidth: number;

  tag: string;
  page: number = 1;
  numItemsPerPage: number = 20;
  flexBasis = "25%"

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;

      let changed = false;
      if (this.screenWidth < 600){
        if (this.numItemsPerPage != 5){
          this.flexBasis = "100%"
          this.numItemsPerPage = 5;
          changed =  true;
        }
      }
      else if (this.screenWidth < 800){
        if (this.numItemsPerPage != 15){
          this.flexBasis = "33.3333%";
          this.numItemsPerPage = 9;
          changed =  true;
        }
      }
      else{
        if (this.numItemsPerPage != 20){
          this.flexBasis = "25%";
          this.numItemsPerPage = 20;
          changed =  true;
        }
      }

      if (changed){
        this.updateDisplayProduct(this.page);
      }
}

  constructor(private route: ActivatedRoute,
              private productService: ProductService) { 
  }

  async ngOnInit() {
    
    this.onResize();
    this.populateProducts();
  }

  private populateProducts(){

    this.productService.getAll()
    .pipe(switchMap((products: Product[])=> 
      { 
        this.products = products;
        return this.route.queryParamMap;
      }))
    .subscribe(params=>{
        
        this.applyFilter(params);
        this.updateDisplayProduct(this.page);
      })
  }

  private applyFilter(params){

    let category = params.get('category');
    if (category){
      this.tag = "Category: " + category[0].toUpperCase() + category.substring(1);
      this.filteredProducts = this.products.filter(p=>p.category === category)
      return;
    }

    let search = params.get('search');
    if (search){
      search = search.toLocaleLowerCase();
      this.tag = "Search result of: " + search;
      this.filteredProducts = this.products.filter(p=>p.title.toLocaleLowerCase().includes(search))
      return;
    }

    this.tag = "All items";
    this.filteredProducts = this.products; 
  }

  onPageChange($event){
    this.updateDisplayProduct($event);
  }

  private updateDisplayProduct($event){

    if (!this.filteredProducts) return;

    let start = $event? $event : 1;
    let startIdx = (start - 1) * this.numItemsPerPage;
    this.displayProducts = this.filteredProducts.slice(startIdx, startIdx + this.numItemsPerPage);  
  }
}
