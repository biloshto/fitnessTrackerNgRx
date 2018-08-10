import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
// WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    // private authService: AuthService,
    // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
    private store: Store<fromRoot.State>, 
    // private router: Router
    // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
  ) {}
  // we need the authService to find out whether the user is authenticated or not

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if(this.authService.isAuth()) {
    //   // the isAuth() method returns true if the user is authenticated, and false if it's not; so if this returns true we want to return true
    //   return true;
    // } else {
    //   // otherwise, if this returns false, we want to redirect the user to the Login page so they won't get stucked
    //   this.router.navigate(['/login']);
    // }
    // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // this will give us an observable which in the end returns true or false; with this addition of take(1) we tell NgRx or the guard here that we want to finish after getting 1 value, take(1) simply takes 1 value and then closes this subscription here
  }

  canLoad(route: Route) {
    // if(this.authService.isAuth()) {
    //   // the isAuth() method returns true if the user is authenticated, and false if it's not; so if this returns true we want to return true
    //   return true;
    // } else {
    //   // otherwise, if this returns false, we want to redirect the user to the Login page so they won't get stucked
    //   this.router.navigate(['/login']);
    // }
    // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // this will give us an observable which in the end returns true or false
  }
}

// the AuthGuard needs to return true, or a promise that resolves to true, or an observable that resolves to true, to grant access to a route the user wants to load (to grant access it needs to know that the user is authenticated)
// we need to do something if it's not true or otherwise the routing would not be allowed and the user will get stucked