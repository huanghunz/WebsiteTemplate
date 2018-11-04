import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product-service.service';
import { Router, ActivatedRoute } from '@angular/router';

import {take} from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any>;
  id: string;

  product = { }; // A product object without key

  constructor(
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              categoryService: CategoryService,) { 
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id && this.id != 'undefined'){
      // take operator gets 1 item, subscribe, then will not get new value
      this.productService.get(this.id).pipe(
                take(1)).subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save( product){

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
