import {ActionReducer, createReducer, on} from "@ngrx/store";
import {IAccountState, initialState} from "./account";
import * as AccountActions from "./account.actions";

export const accountReducer: ActionReducer<IAccountState> = createReducer(
  initialState,
  on(
    AccountActions.setIsAuthorized,
    (state: IAccountState, { isAuthorized }) => ({isAuthorized: isAuthorized})
  )
);
