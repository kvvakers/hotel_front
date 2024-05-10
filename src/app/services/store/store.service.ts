import {hotelListReducer} from "./hotelList/hotelList.reducer";
import {Action, ActionReducerMap} from "@ngrx/store";
import {accountReducer} from "./account/account.reducer";

export const reducers :  ActionReducerMap<unknown, Action>= {
    hotelList: hotelListReducer,
    account: accountReducer,
}
