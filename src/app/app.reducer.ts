import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
// ActionReducerMap is a map of all the reducers we have in the end, map to state slices
// createFeatureSelector is a helper function which makes it easier for us to pull information from our state
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
  ui: fromUi.State;
  // *ref.1
  auth: fromAuth.State;
}
// defining our application-wide state

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  // *ref.2
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
// what this will do is will allow us to simply call this function (getUiState) and get quick access to this state (*ref.1) as returned by this reducer (*ref.2) in our global app state
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);



// here we want to merge all the different reducers we have