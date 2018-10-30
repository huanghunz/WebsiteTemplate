
import {environment} from './../environments/environment'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSucessComponent } from './order-sucess/order-sucess.component';
import { LoginComponent } from './login/login.component' 
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyOrdersComponent } from './my-orders/my-orders.component'

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSucessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // angular cli will choose
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path:'', component: HomeComponent },
      { path:'products', component: ProductsComponent },
      { path:'shopping-cart', component: ShoppingCartComponent },
      { path:'check-out', component: CheckOutComponent },
      { path:'my/orders', component: MyOrdersComponent },
      { path:'order-success', component: OrderSucessComponent },
      { path:'login', component: LoginComponent },
      { path:'admin/products', component: AdminProductsComponent },
      { path:'admin/orders', component: AdminOrdersComponent },
    ]),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
