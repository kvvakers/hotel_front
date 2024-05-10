import {createAction, props} from "@ngrx/store";

export const setIsAuthorized = createAction(
  '[Account] set isAuthorized',
  props<{ isAuthorized: boolean }>()
);
