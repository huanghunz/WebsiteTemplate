import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  // For searching/filtering feature, can not use an observable
  flattenOrders: any[] = []
  showDetail: boolean = false;
  detailedOrder = null;

  headers = ['datePlaced', 'userId', 'key', 'status']
  btnLabel = "Details";
  subscription: Subscription;

  constructor(private orderService: OrderService,
              private dialog: MatDialog) { 
  }

  ngOnInit() {
    this.subscription 
    = this.orderService.getAll().subscribe((orders:any[])=>{
      orders.forEach((o:any)=>{
        this.flattenOrders = []
        let flatten = Object.values(o.orders);
        let keys = Object.keys(o.orders);
        flatten.forEach( (obj, i)=>{
          
          obj['key'] = keys[i];
          obj['datePlaced'] = obj['datePlaced'].substring(0, obj['datePlaced'].indexOf("T"));
        })
        
       this.flattenOrders.push(flatten);
      });

    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

   edit(row){
    this.orderService.getByUserId(row.userId).pipe(
      take(1)).subscribe( (orders:any[]) =>{
        for (var i = 0; i < orders.length; i++) {

          if (orders[i].key == row.key) {

            this.openDialog(row, orders[i]);
            break;
          }
        }
         
      });
   }

   openDialog(flattenOrder, order): void {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '80%',

      data: { order: order,
             firstName: flattenOrder.shipping.firstName,
             lastName: flattenOrder.shipping.lastName,
             userId: flattenOrder.userId}
    });

    dialogRef.afterClosed().subscribe(result => {

      order.status = result;
      const objectWithoutKey = (object, key) => {
        const {[key]: _, ...otherKeys} = object;
        return otherKeys;
      }

      let updated = objectWithoutKey(order, 'key');
      
      this.orderService.update(order.userId, order.key, updated);
    });
  }
}