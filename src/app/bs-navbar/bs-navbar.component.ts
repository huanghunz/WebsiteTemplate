import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AppUser } from '../models/app-users';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

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

  isNavbarCollapsed: boolean;

  constructor(private authService: AuthService,
             private cartService: ShoppingCartService,
             private categoryService: CategoryService,
             private router: Router) {
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

  onSearchClick(query){
    this.router.navigate(['/products'], { queryParams: { search: query } });
  }
}
