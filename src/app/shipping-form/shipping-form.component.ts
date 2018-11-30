import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Address } from '../models/address';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {


  @ViewChild('f') form: NgForm;

  @Input() cart;

  userId: string;
  userSubscription: Subscription;
  shipping: Address = new Address();
  
  constructor(
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService) { }

    async ngOnInit() {
      this.userSubscription = this.authService.user$.subscribe(user=> this.userId = user.uid);
    }
  
    ngOnDestroy(){
      this.userSubscription.unsubscribe();
    }

  async checkout(isValid){
    if (!isValid) {
      (<any>Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    } 

    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order); 
    this.router.navigate(['/order-success', result.key]);
  }
}
