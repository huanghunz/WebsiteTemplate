import { Component,  Input,  DoCheck } from '@angular/core';
import { Product } from '../models/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements DoCheck {
 
  @Input() product: Product;
  @Input('show-actions') showActoin = true; 
  @Input('preview-only') previewOnly = false;

  coverImgUrl: string;
  constructor(private router: Router) {
  }
  
  ngDoCheck() {
    if (!this.coverImgUrl) this.coverImgUrl = this.product.imgUrl;
  }

  updateCoverImage(url){
    this.coverImgUrl = url;
  }

  click(key){
    this.router.navigate(['/product/details/', key])
  }
}
