// import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
// importing all exported things from the TrainingReducer file and store it in the fromTraining variable

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  // @Output() trainingStart = new EventEmitter<void>();
  // with Output we make this listenable event to which we can listen from the outside
  // we no longer listen to this event emitter, instead we're using the TrainingService for this

  // exercises: Exercise[] = [];
  // // exercises property that is an array of Exercise and is empty initially but where we store the exercies from our TrainingService
  exercises$: Observable<Exercise[]>;
  // changing the existing exercises property to be an observable because of NgRx (it's a convention to use dollar sign at the end of the variable names which
  // exerciseSubscription: Subscription;
  // // in exerciseSubscription we're storing the subscription so we can later unsubscribe when our component gets destroyed
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
  // isLoading = false;
  // // isLoading is a property that's initially false but which we now switch whenever we get a new loading state
  isLoading$: Observable<boolean>;
  // changing the existing isLoading property to be an observable because of NgRx (it's a convention to use dollar sign at the end of the variable names which are controller by NgRx)
  // private loadingSubscription: Subscription;
  // // a property where we store our subscription
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW

  constructor(
    private trainingService: TrainingService, 
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    // this.exercises = this.trainingService.getAvailableExercises();
    // when this component is initialized get the exercises from the TrainingService and store them in exercises so we can show them in our template file dynamically
    // we'll remove this method call here, and instead we now want to use AngularFire
    
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isItLoading => {
    //   this.isLoading = isItLoading;
    // });
    // // we're listening for changes in the loading state once we initialized this component, and store the subscription in a property so we could unsubscribe from it in ngOnDestroy()
    // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
    //   this.exercises = exercises;
    //   // if we fail we still get an event but the exercises we get will be null, so this.exercises will be null and that allows us to handle this in our component
    // });
    // // we want to subscribe to the newly created Subject exercisesChanged and get the exercises from there that we store in our exercises property here
    // // this.trainingService.fetchAvailableExercises();
    // // since we're calling this here in ngOnInit is therefore always called whenever we go to New Training
    // // commenting this out since we implemented a new Try Again button for fetching exercises after we failed to get them initially, so instead we moved this call in it's own separate method named fetchExercises() and called that method from inside ngOnInit()
    // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    // we emit an event whenever we click on the start training button, so all we have to do now is listen to trainingStart back in our TrainingComponent html file in the app-new-training selector
    // we no longer listen to this event emitter, instead we're using the TrainingService for this

    this.trainingService.startExercise(form.value.exercise);
  }
  // out goal is to emit a custom event in our HeaderComponent to which we can listen from our TrainingComponent (in our app-new-training selector) which then we can use to call toggle on the sidenav reference

  // ngOnDestroy() {
  //   if(this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  //   if(this.loadingSubscription) {
  //     this.loadingSubscription.unsubscribe();
  //   }
  //   // if we don't have subscriptions for some reason and unsubscribe() is called before our subscriptions are created we could get an error, so therefore we should add a check where we say if our subscription exist then we would like to unsubscribe
  // }  
  // WE NO LONGER NEED THIS BECAUSE WE'RE USING NGRX NOW

}
