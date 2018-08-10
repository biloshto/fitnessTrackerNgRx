import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  // ongoingTraining = false;
  // // this will be set to true whenever we choose a training, whenever we have a running training
  ongoingTraining$: Observable<boolean>;
  // changing the existing ongoingTraining property to be an observable because of NgRx (it's a convention to use dollar sign at the end of the variable names which are controller by NgRx)
  // exerciseSubscription: Subscription;
  // // property which is undefined initially but where we store the subscription
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW

  constructor(
    private trainingService: TrainingService, 
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
    //   if(exercise) {
    //     this.ongoingTraining = true;
    //     // if the selected exercise is not null, it means that the user picked a training so set ongoingTraining to true
    //   } else {
    //     this.ongoingTraining = false;
    //     // otherwise set it to false
    //   }
    // });
    // // in subscribe we're receiving the emitted data, so the selected exercise, whenever we call next in the TrainingService
    // // IMPORTANT: if we're subscribing to an observable as we're doing it here, we also should unsubscribe if we don't need it anymore; this clears up unneeded memory and prevents memory leaks; to do this we need to import Subscription from rxjs and this allows us to create a new property of type Subscription which is undefined initially but where we store this subscription we're creating here; we should unsubscribe whenever this component gets destroyed, so in the OnDestroy() method
    // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
    // this gives us an observable which will eventually give us a true or false
  }

  // ngOnDestroy() {
  //   if(this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  //   // if we don't have subscriptions for some reason and unsubscribe() is called before our subscriptions are created we could get an error, so therefore we should add a check where we say if our subscription exist then we would like to unsubscribe
  // }
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW

}
