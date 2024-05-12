import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {RoomItem} from "../../../models/room-item";
import {IRoom} from "../../../models/room-interface";
import {Image} from "../../../models/image";
import {IImage} from "../../../models/image-interface";
import {Deal} from "../../../models/deal";
import {IDeal} from "../../../models/deal-interface";

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
  changeRoomStatus(id: number) {
    this.endpoint = `rooms/inaccessible?id=${id}`;
    this.headers = this.getHeaders();
    return this.httpClient.get(this.url + this.endpoint, { headers: this.headers });
  }
  book(deal: Deal) {
    this.endpoint = "deals";
    this.headers = this.getHeaders();

    return this.httpClient.post(this.url + this.endpoint, deal, { headers: this.headers });
  }
  getDeals(): Observable<Deal[]> {
    this.endpoint = "deals";
    this.headers = this.getHeaders();

    return this.httpClient.get<IDeal[]>(this.url + this.endpoint, { headers: this.headers })
      .pipe(
        map((items: IDeal[]) => {
          return items.map((item: IDeal) => {
            return new Deal(
              item.roomId,
              new Date(item.dateBegin).toISOString().split("T")[0],
              new Date(item.dateEnd).toISOString().split("T")[0],
              item.email,
              item.phone,
              item.room,
              item.room.hotel,
              item.total
            );
          });
        })
      );
  }

  private getRequest() : Observable<RoomItem[]> {
    return this.httpClient
      .get<IRoom[]>(this.url + this.endpoint, { headers: this.headers })
      .pipe(
        map((items: IRoom[]) => {
          return items.map((item: IRoom) => {
            const images: Image[] = item?.images?.map((image: IImage) => new Image(image.imageId, image.image, image.roomId)) || [];
            return new RoomItem(
              item.id,
              item.roomId,
              item.bedNumbers,
              item.price,
              item.hotelId,
              images,
              item.status
            )
          });
        })
      );
  }
}
