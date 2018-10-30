import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'harvardschrome';

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService){
    this.authService.user$.subscribe(user=>{
      if (user){
        this.userService.save(user); // TODO: add registration form

        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
    })
  }
}
