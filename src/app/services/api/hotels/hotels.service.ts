import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, retry} from "rxjs";
import {HotelItem} from "../../../models/hotel-item";
import {RoomItem} from "../../../models/room-item";
import {IHotel} from "../../../models/hotel-interface";
import {IRoom} from "../../../models/room-interface";
import {RoomImage} from "../../../models/room-image";
import {IRoomImage} from "../../../models/room-image-interface";

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
  getMyHotels() : Observable<HotelItem[]> {
    this.endpoint = "hotels/my/";

    this.headers = this.headers = this.getHeaders();

    return this.getRequest();
  }
  getHotelById(id: number) : Observable<HotelItem> {
    this.endpoint = `hotels/my/by?id=${id}`;
    this.headers = this.headers = this.getHeaders();

    return this.httpClient
      .get<IHotel>(this.url + this.endpoint, { headers: this.headers })
      .pipe(map(this.convertRespondedData));
  }

  private getRequest() : Observable<HotelItem[]> {
    return this.httpClient
      .get<IHotel[]>(this.url + this.endpoint, { headers: this.headers })
      .pipe(
        map((items: IHotel[]) => {
          return items.map(this.convertRespondedData)
        })
      );
  }

  saveHotel(hotel: HotelItem) : Observable<HotelItem> {
    this.endpoint = "hotels";
    this.headers = this.headers = this.getHeaders();

    return this.httpClient
      .post<IHotel>(this.url + this.endpoint, hotel, { headers: this.headers })
      .pipe(map(this.convertRespondedData));
  }
  private convertRespondedData(item: IHotel): HotelItem {
    const roomList: Array<RoomItem> = [];
    item.roomList.forEach((el: IRoom): void => {
      const images: RoomImage[] = el.images?.map((image: IRoomImage) => new RoomImage(image.id, image.image, image.roomId)) || [];
      roomList.push(new RoomItem(el.id, el.roomId, el.bedNumbers, el.price, el.hotelId, images));
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
  }
}



