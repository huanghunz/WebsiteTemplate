import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AppUser } from '../models/app-users';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  
 
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  categories$: Observable<string[]>

  category: string;

  logo1 = "./../assets/images/logo.png"
  logo2 = "assets/images/logo2.png"

  constructor(private authService: AuthService,
             private cartService: ShoppingCartService,
             private categoryService: CategoryService) {
             }

  async ngOnInit() {

    this.cart$ = await this.cartService.getCart();
    this.categories$ = this.categoryService.getAll();
   
    this.authService.appUser$.subscribe(appUser => 
      { 
        this.appUser = appUser
      })
  }
  
  logout(){
    this.authService.logout();
  }

  categoryClicked(name){
    this.category = name;
  }
}
