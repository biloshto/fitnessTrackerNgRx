import { Action } from "@ngrx/store";

import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions';


export interface State {
  isLoading: boolean;
};
// an interface for the inital state, or for the state in general; so this is not an object, just a type definition

const initalState: State = {
  isLoading: false
};
// in the initalState we store our inital state and this is a JavaScript object where we want to manage this isLoading state, to start simple (isLoading is a boolean so we're setting it to false initially)

export function uiReducer(state = initalState, action: UIActions) {
  switch(action.type) {
    case START_LOADING:
      return {
        isLoading: true
      };
      // this is the immutable thing; we're not returning the old state where we switch isLoading to true, we're returning a new state and our state only is an object with one property which is why we return an object with one property here (the isLoading property where we set it to true)
    case STOP_LOADING:
      return {
        isLoading: false
      };
    default: {
      return state;
      // a default case in case some other action hits this reducer where we return the state without any changes
    }
  }
}
// we're giving the incoming state a default value of initalState so that we start with the initalState in case this reducer is executed the first time when we have no state yet

export const getIsLoading = (state: State) => state.isLoading;

// a reducer that is just focused on the isLoading state; a reducer is just a function that simply takes the old state as an input, as well as the incoming action (because we dispatch actions to change the store, we don't do it directly) and in this reducer we do one simple thing - we return the new state