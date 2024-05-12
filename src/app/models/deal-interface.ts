import {IRoom} from "./room-interface";
import {IHotel} from "./hotel-interface";
import {Timestamp} from "rxjs";

export interface IDeal {
  dealId: number;
  dateBegin: number;
  dateEnd: number;
  email: String;
  phone: String;
  total: number;
  roomId: number;
  room: IRoom;
  hotel: IHotel;
}
