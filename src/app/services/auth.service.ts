import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { Observable, of } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-users';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // $ Indicate it is observalbe
  user$: Observable<firebase.User>; // firebase.User can be abstracted

  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private userService: UserService) {
               
    this.user$ = this.afAuth.authState;
    //console.log("??", this.user$);
  }

  loginG(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$():Observable<AppUser>{
    //console.log("get app user");
    return this.user$.pipe(
      switchMap(user => { 
       // console.log("switching map");
        if (user)
          return this.userService.get(user.uid).valueChanges();
        
        return of(null);
      })
    )
  }
}
