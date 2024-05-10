import {IRoomImage} from "./room-image-interface";

export interface IRoom {
  id: number;
  roomId: number;
  bedNumbers: number;
  price: number;
  hotelId: number;
  images: IRoomImage[];
}
