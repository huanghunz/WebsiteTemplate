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
export class BsNavbarComponent implements OnInit, OnDestroy{
  
 
  appUser: AppUser;
  cart;
  subscription: Subscription;

  constructor(private authService: AuthService,
             private cartService: ShoppingCartService) {
             }

  async ngOnInit() {

    this.subscription = (await this.cartService.getCart())
    .subscribe( c =>{
    
      this.cart  = c;
    });
    
   
    this.authService.appUser$.subscribe(appUser => 
      { 
        this.appUser = appUser
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  logout(){
    this.authService.logout();
  }
}
