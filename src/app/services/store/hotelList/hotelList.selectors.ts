import { createSelector, createFeatureSelector } from '@ngrx/store';
import {IHotelListState} from "./hotelList";

export const selectHotelListState = createFeatureSelector<IHotelListState>('hotelList');

export const selectHotelList = createSelector(
  selectHotelListState,
  (state: IHotelListState) => state?.hotelList
);
