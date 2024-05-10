import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IAccountState} from "./account";

export const selectIsAuthorizedState = createFeatureSelector<IAccountState>('account');

export const selectIsAuthorized = createSelector(
  selectIsAuthorizedState,
  (state: IAccountState) => state?.isAuthorized
);
