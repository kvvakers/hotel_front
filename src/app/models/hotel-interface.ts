import {IRoom} from "./room-interface";

export interface IHotel {
    hotelId: number;
    hotelName: string;
    image: string;
    description: string;
    cityName: string;
    rating: number;
    roomList: IRoom[];
}
