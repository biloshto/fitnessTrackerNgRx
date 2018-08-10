import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
// importing all exported things from the AppReducer file and store it in the fromApp variable

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  // maxDate should ensure that a person has to be at least 18 years old
  // isLoading = false;
  // // isLoading is a property that's initially false but which we now switch whenever we get a new loading state
  isLoading$: Observable<boolean>;
  // changing the existing isLoading property to be an observable because of NgRx (it's a convention to use dollar sign at the end of the variable names which are controller by NgRx)
  // private loadingSubscription: Subscription;
  // // a property where we store our subscription
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW

  constructor(
    private authService: AuthService, 
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isItLoading => {
    //   this.isLoading = isItLoading;
    // });
    // // we're listening for changes in the loading state once we initialized this component, and store the subscription in a property so we could unsubscribe from it in ngOnDestroy()
    // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
    this.maxDate = new Date(); // this is today
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); // today's year minus 18, so this gives us today 18 years ago
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
      // in the SignupComponent on the email input we assigned a name of email, for password we assigned a name of password which is why we're able to access the name and password on these names
    });
    // on submit we need to register the user; so we'll reach out to our authService and call the registerUser(), this method expects to get data of type AuthData, which is an object with an email and a password property both holding string values
  }

  // ngOnDestroy() {
  //   if(this.loadingSubscription) {
  //     this.loadingSubscription.unsubscribe();
  //   }
  //   // if we don't have subscriptions for some reason and unsubscribe() is called before our subscriptions are created we could get an error, so therefore we should add a check where we say if our subscription exist then we would like to unsubscribe
  // }
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW

}
