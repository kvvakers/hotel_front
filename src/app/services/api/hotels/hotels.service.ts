import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable, retry} from "rxjs";
import {HotelItem} from "../../../models/hotel-item";
import {RoomItem} from "../../../models/room-item";

@Injectable({
  providedIn: 'root'
})
export class HotelsService extends ApiService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  getHotelsWithParams(cityName: String, dateStart: String, dateEnd: String, personAmount: number) : Observable<HotelItem[]>  {
    this.endpoint = `hotels?cityName=${cityName}&startDate=${dateStart}&endDate=${dateEnd}&personAmount=${personAmount}`
    return this.getRequest();
  }

  getHotelsWithoutParams() : Observable<HotelItem[]>  {
    const dateStart = new Date().toISOString().split("T")[0];
    const dateEnd = new Date().toISOString().split("T")[0];
    this.endpoint = `hotels?cityName=&startDate=${dateStart}&endDate=${dateEnd}&personAmount=1`
    return this.getRequest();
  }

  private getRequest() : Observable<HotelItem[]> {
    return this.httpClient
      .get<any[]>(this.url + this.endpoint, { headers: this.headers })
      .pipe(
        map((items: IHotel[]) => {
          return items.map((item: IHotel) => {
            const roomList: Array<RoomItem> = [];
            item.roomList.forEach((el: IRoom) => {
              roomList.push(new RoomItem(el.roomId, el.bedNumbers, el.price, el.hotelId));
            });
            return new HotelItem(
              item.hotelId,
              item.hotelName,
              item.image,
              item.description,
              item.cityName,
              item.rating,
              roomList,
            );
          })
        })
      );
  }
}

interface IRoom {
  roomId: number;
  bedNumbers: number;
  price: number;
  hotelId: number;
}
interface IHotel {
    hotelId: number;
    hotelName: string;
    image: string;
    description: string;
    cityName: string;
    rating: number;
    roomList: IRoom[];
}

