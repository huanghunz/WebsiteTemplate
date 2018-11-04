import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AppUser } from '../models/app-users';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';
import { AngularFireObject } from 'angularfire2/database';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  
 
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService,
             private cartService: ShoppingCartService) {
             }

  async ngOnInit() {

    this.cart$ = await this.cartService.getCart();
   
    this.authService.appUser$.subscribe(appUser => 
      { 
        this.appUser = appUser
      })
  }
  
  logout(){
    this.authService.logout();
  }
}
