import { Action, createFeatureSelector, createSelector  } from "@ngrx/store";

import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { Exercise } from "./exercise.model";
import * as fromRoot from '../app.reducer';


export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
};
// an interface for the inital training state; so this is not an object, just a type definition; this state here needs to extend the app state because we want to load this state lazily

export interface State extends fromRoot.State {
  training: TrainingState;
}
// the AppState doesn't know about the TrainingState, but the TrainingState knows about the AppState and whenever we load this module lazily it'll merge behind the scenes; so this is our new global state after this module has been lazy loaded

const initalState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};
// in the initalState we store our inital state and this is a JavaScript object where we set availableExercises and finishedExercises to empty arrays initially

export function trainingReducer(state = initalState, action: TrainingActions) {
  switch(action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        // we need to first distribute the old state properties because this will pull out the finishedExercises and activeTraining and store them in this new object we're creating, and also pull out the availableExercises and it will then only override the old availableExercises with the new ones; if we wouldn't do this then our new state after this action would be an object with just the availableExercises and our old finishedExercises and activeTraining would be lost
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {...state.availableExercises.find(exercise => exercise.id === action.payload)}
        // here we find one exercise where that exercise's id matcher our action's payload which also is an id (both are strings); an immutable copy, a new object where we distribute the properties of the exercises we're loading
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state;
      // a default case in case some other action hits this reducer where we return the state without any changes
    }
  }
}
// we're giving the incoming state a default value of initalState so that we start with the initalState in case this reducer is executed the first time when we have no state yet


export const getTrainingState = createFeatureSelector<TrainingState>('training');
// this identifier here has to match the identifier we set in our TrainingModule forFeature()

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
// here getTrainingState gives us access to the entire state slice, and the arrow function then takes this state slice and picks the availableExercises from it
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
// here getTrainingState gives us access to the entire state slice, and the arrow function then takes this state slice and picks the finishedExercises from it
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
// here getTrainingState gives us access to the entire state slice, and the arrow function then takes this state slice and picks the activeTraining from it
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
// here getTrainingState gives us access to the entire state slice, and the arrow function then takes this state slice and checks if there is an activeTraining, if it's not null

// a reducer is just a function that simply takes the old state as an input, as well as the incoming action (because we dispatch actions to change the store, we don't do it directly) and in this reducer we do one simple thing - we return the new state



// the training module is loaded lazily therefore we can't go the AppReducer and add training as a state to our reducer map, this won't work because this would require us to import the Training reducer and the state ahead of time before we actually load the module; so we want to load this state lazily too, just like the module