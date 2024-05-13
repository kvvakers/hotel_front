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
export class DealsService extends ApiService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  book(deal: Deal) {
    this.endpoint = "deals";
    this.headers = this.getHeaders();

    return this.httpClient.post(this.url + this.endpoint, deal, { headers: this.headers });
  }
  getDeals(): Observable<Deal[]> {
    this.endpoint = "deals/to-me";
    this.headers = this.getHeaders();

    return this.httpClient.get<IDeal[]>(this.url + this.endpoint, { headers: this.headers })
      .pipe(
        map(this.pipeDelegate)
      );
  }
  getBooks(): Observable<Deal[]> {
    this.endpoint = "deals/with-me";
    this.headers = this.getHeaders();

    return this.httpClient.get<IDeal[]>(this.url + this.endpoint, { headers: this.headers })
      .pipe(
        map(this.pipeDelegate)
      );
  }
  pipeDelegate(items: IDeal[]): Deal[] {
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
  }
}
