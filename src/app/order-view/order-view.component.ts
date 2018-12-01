import { Component,  Input,  DoCheck } from '@angular/core';
import { Product } from '../models/products';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent {

  @Input() order;

  constructor(private router: Router) {
  }


  click(key){
    this.router.navigate(['/product/details/', key])
  }
}
