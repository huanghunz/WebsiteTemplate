import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { UserService } from './user.service';
import { AppUser } from '../models/app-users';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService,
              private router: Router,
              private userService: UserService) {

  }

  canActivate(): Observable<boolean> {

    // switch map: get another form of object,
    // then return the object for map function
    // then return boolean
    return this.auth.appUser$.pipe(
      map((appUser: AppUser) => appUser.isAdmin)
    )
  }
}
