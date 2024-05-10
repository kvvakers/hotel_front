import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {RoomItem} from "../../../models/room-item";
import {HotelItem} from "../../../models/hotel-item";
import {IRoom} from "../../../models/room-interface";
import {RoomImage} from "../../../models/room-image";
import {IRoomImage} from "../../../models/room-image-interface";

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
      .get<IRoom[]>(this.url + this.endpoint, { headers: this.headers })
      .pipe(
        map((items: IRoom[]) => {
          return items.map((item: IRoom) => {
            const images: RoomImage[] = item?.images.map((image: IRoomImage) => new RoomImage(image.id, image.image, image.roomId)) || [];
            return new RoomItem(
              item.id,
              item.roomId,
              item.bedNumbers,
              item.price,
              item.hotelId,
              images
            )
          });
        })
      );
  }
}
