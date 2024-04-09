import {createReducer, on, State} from "@ngrx/store";
import * as HotelListActions from "./hotelList.actions"
import {IHotelListState, initialState} from "./hotelList";


export const hotelListReducer = createReducer(
  initialState,
  on(HotelListActions.setHotelList, (state : IHotelListState, { hotelList }) => ({ hotelList: [ ...hotelList ] })),
);
