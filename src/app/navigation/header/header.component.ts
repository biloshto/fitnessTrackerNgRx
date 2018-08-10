import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  // with Output we make this listenable event to which we can listen from the outside
  // isAuth = false;
  // // the user is not logged in initially, so isAuth should be false
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
  isAuth$: Observable<boolean>;
  // changing the existing isAuth property to be an observable because of NgRx (it's a convention to use dollar sign at the end of the variable names which are controller by NgRx)
  // authSubscription: Subscription;
  // // property which is undefined initially but where we store the subscription
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    //   // this will be true if a user is logged in, or false if it's not
    // });
    // // in subscribe we're receiving the emitted data, so true or false, whenever we call next in the AuthService
    // // IMPORTANT: if we're subscribing to an observable as we're doing it here, we also should unsubscribe if we don't need it anymore; this clears up unneeded memory and prevents memory leaks; to do this we need to import Subscription from rxjs and this allows us to create a new property of type Subscription which is undefined initially but where we store this subscription we're creating here; we should unsubscribe whenever this component gets destroyed, so in the OnDestroy() method
    // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
    // we emit an event whenever we click the hamburger menu button, so all we have to do now is listen to sidenavToggle back in our AppComponent html file in the app-header selector
  }
  // out goal is to emit a custom event in our HeaderComponent to which we can listen from our AppComponent (in our app-header selector) which then we can use to call toggle on the sidenav reference

  onLogout() {
    this.authService.logout();
  }


  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW

}
