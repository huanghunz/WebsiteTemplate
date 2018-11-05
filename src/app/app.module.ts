
import {environment} from './../environments/environment'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms"
import { CustomFormsModule } from 'ng2-validation'

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component' 
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyOrdersComponent } from './my-orders/my-orders.component'
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product-service.service';
import { TableOverviewComponent } from './table-overview/table-overview.component';

import { MatFormFieldModule, MatInputModule, MatSortModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge';

import { ProductViewComponent } from './product-view/product-view.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ItemComponent } from './admin/product-form/item/item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    MyOrdersComponent,
    ProductFormComponent,
    TableOverviewComponent,
    ProductViewComponent,
    CategoryViewComponent,
    ProductQuantityComponent,
    ItemComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule, // for form validation

    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatBadgeModule,

    AngularFireModule.initializeApp(environment.firebase, 'harvardschrome'), // angular cli will choose
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path:'', component: ProductsComponent },
      { path:'products', component: ProductsComponent },
      { path:'shopping-cart', component: ShoppingCartComponent },
      { path:'login', component: LoginComponent },
      { path:'product/details/:id', component: ProductDetailsComponent},
      
      { path:'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]  },
      { path:'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
      { path:'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
      
      { path:'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path:'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path:'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path:'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
    ]),
    NgbModule.forRoot(), // angular directives for bootstrap
  ],
  providers: [AuthService, AuthGuardService,
              UserService, AdminAuthGuardService,
              CategoryService, ProductService,
              ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
