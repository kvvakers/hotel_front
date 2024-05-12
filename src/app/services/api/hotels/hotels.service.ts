import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {HotelItem} from "../../../models/hotel-item";
import {RoomItem} from "../../../models/room-item";
import {IHotel} from "../../../models/hotel-interface";
import {IRoom} from "../../../models/room-interface";
import {Image} from "../../../models/image";
import {IImage} from "../../../models/image-interface";

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

    this.headers = this.getHeaders();

    return this.getRequest();
  }
  getHotelById(id: number) : Observable<HotelItem> {
    this.endpoint = `hotels/my/by?id=${id}`;
    this.headers = this.getHeaders();

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

  saveHotel(hotel: HotelItem) : Observable<IHotel> {
    this.endpoint = "hotels";
    this.headers = this.getHeaders();

    return this.httpClient
      .post<IHotel>(this.url + this.endpoint, hotel, { headers: this.headers });
  }
  private convertRespondedData(item: IHotel): HotelItem {
    const roomList: Array<RoomItem> = [];
    item.roomList.forEach((el: IRoom): void => {
      const images: Image[] = el.images?.map((image: IImage) => new Image(image.imageId, image.image, image.roomId)) || [];
      roomList.push(new RoomItem(el.id, el.roomId, el.bedNumbers, el.price, el.hotelId, images, el.status));
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



