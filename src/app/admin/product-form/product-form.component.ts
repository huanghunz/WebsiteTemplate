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

  product = {
  };

  constructor(
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              categoryService: CategoryService,) { 
    this.categories$ = categoryService.getCategories();

    const id = this.route.snapshot.paramMap.get('id');
    console.log("??? ", id, "\n", this.route.snapshot.paramMap);
    if (id && id != 'undefined'){
      // take operator gets 1 item, subscribe, then will not get new value
      this.productService.get(id).pipe(
                take(1)).subscribe(p => this.product = p);
    }
    
  }

  ngOnInit() {
  }

  save(product){
    //console.log(product);

    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  log(x) { console.log(x)}
}
