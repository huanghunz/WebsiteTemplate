import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cart;
  subscription: Subscription

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
                    .subscribe( c =>{ this.cart  = c;  });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
