import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$;

  constructor(orderService: OrderService,
              authService: AuthService) { 

    this.orders$ = authService.user$.pipe(switchMap(
      u=>{

        let o =  orderService.getOrdersByUser(u.uid);
        o.subscribe(oo=>console.log(oo))
        return o;
      }));
      
  }
}