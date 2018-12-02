import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

import {take} from 'rxjs/operators';


interface NewProduct{
  title: string;
  price: number;
  category: string;
  imgUrl: string; // cover image
  date: string;
  summary: string;
  imgUrls:string[];
  details:string[];
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any>;
  id: string;
  product : NewProduct;

  constructor(
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              categoryService: CategoryService,) { 
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');

    this.product = {
      title: "New Product",
      price: 0,
      category: "",
      date: "",
    
      imgUrl: "", // cover image
      imgUrls:[],

      summary: "",
      details:[],
    }
    
    if (this.id && this.id != 'undefined'){
      // take operator gets 1 item, subscribe, then will not get new value
      this.productService.getById(this.id).pipe(
                take(1)).subscribe( (p:any) =>{
                  this.product = p;
                });
    }
  }

  ngOnInit() {
  }

  save(){

    let product: NewProduct;
    product = {
      ...this.product
    }
    
    console.log("cr: ", product);

    if (this.id){
      this.productService.update(this.id, product);
    }
    else{
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (!confirm("Delete this product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
