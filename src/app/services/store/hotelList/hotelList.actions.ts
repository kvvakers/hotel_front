import {createAction, props} from '@ngrx/store';
import {HotelItem} from "../../../models/hotel-item";

export const setHotelList = createAction(
  '[HotelList] set HotelList',
  props<{ hotelList: HotelItem[] }>()
);
