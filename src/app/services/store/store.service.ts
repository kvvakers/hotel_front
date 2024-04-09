import {hotelListReducer} from "./hotelList/hotelList.reducer";
import {Action, ActionReducerMap} from "@ngrx/store";

export const reducers :  ActionReducerMap<unknown, Action>= {
    hotelList: hotelListReducer,
}
