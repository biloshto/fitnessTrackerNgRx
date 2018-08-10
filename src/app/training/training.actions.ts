import { Action } from "@ngrx/store";
import { Exercise } from "./exercise.model";

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {}
  // gets the exercises we want to set as available
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {}
  // gets the exercises we want to set as finished
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {}
  // gets the id of the exercise we want to start
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}
// these action classes don't just have a type, they also have a payload because the available trainings we set have to passed along with the action, the same for the finished trainings, and the training we start

export type TrainingActions =
 SetAvailableTrainings | 
 SetFinishedTrainings | 
 StartTraining | 
 StopTraining;



// exporting action creaters, our actions as classess, so that we get auto-completion support, and TypeScript support in general