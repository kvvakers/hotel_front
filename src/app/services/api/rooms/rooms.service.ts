import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {RoomItem} from "../../../models/room-item";
import {HotelItem} from "../../../models/hotel-item";

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends ApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getRoomsWithParams(hotelId: number, dateStart: String, dateEnd: String, personAmount: number) : Observable<RoomItem[]>  {
    this.endpoint = `rooms?hotelId=${hotelId}&startDate=${dateStart}&endDate=${dateEnd}&personAmount=${personAmount}`
    return this.getRequest();
  }

  private getRequest() : Observable<RoomItem[]> {
    return this.httpClient
      .get<any[]>(this.url + this.endpoint, { headers: this.headers })
      .pipe(
        map(items => {
          return items.map(item => {
            return new RoomItem(
              item.roomId,
              item.bedNumbers,
              item.price,
              item.hotelId
            )
          })
        })
      );
  }
}
