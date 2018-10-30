import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AppUser } from '../models/app-users';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appUser: AppUser;

  constructor(private authService: AuthService) {

    this.authService.appUser$.subscribe(appUser => 
      { 
        this.appUser= appUser
      })
  }

  logout(){
    this.authService.logout();
  }
}
