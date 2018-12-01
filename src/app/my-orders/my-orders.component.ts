import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  //orders$;
  orders = [];
  displayOrders = [];

  userSubscription: Subscription;
  userId;
  screenHeight: number;
  screenWidth: number;

  page: number = 1;
  numItemsPerPage: number = 20;

  constructor(private orderService: OrderService,
    private authService: AuthService,
    private router: Router) {    
      
  }


  async ngOnInit() {
    this.userSubscription = 
      this.authService.user$.subscribe(user=> 
        {
          this.userId = user.uid
          this.populateOrders();
        });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  private populateOrders(){

    this.orderService.getOrdersByUser(this.userId)
      .subscribe(userOrders=>{

        console.log(userOrders);
        this.orders = userOrders.reverse();
        this.orders.forEach(
          o => o.status = o.status == "Ordering"? "Order Recived": o.status)
        this.updateDisplayOrders(null);
      })
  }


  onPageChange($event){
    this.updateDisplayOrders($event);
  }

  private updateDisplayOrders($event){

    if (!this.orders) return;

    let start = $event? $event : 1;
    let startIdx = (start - 1) * this.numItemsPerPage;
    this.displayOrders = this.orders.slice(startIdx, startIdx + this.numItemsPerPage);  
  }

  click(key){
    this.router.navigate(['/orders/order/detail/', key])
  }

}