import {HotelItem} from "../../../models/hotel-item";

export interface IHotelListState {
  hotelList: HotelItem[];
}

export const initialState : IHotelListState = {
  hotelList: [],
}
