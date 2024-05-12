import {IImage} from "./image-interface";
import {IHotel} from "./hotel-interface";

export interface IRoom {
  id: number;
  roomId: number;
  bedNumbers: number;
  price: number;
  hotelId: number;
  images: IImage[];
  status: boolean;
  hotel: IHotel;
}
