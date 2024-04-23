import {Component, EventEmitter, Output} from '@angular/core';
import {InputComponent} from "../../../../controls/input/input.component";
import {DatepickerComponent} from "../../../../controls/datepicker/datepicker.component";
import {CounterComponent} from "../../../../controls/counter/counter.component";
import {ButtonComponent} from "../../../../controls/button/button.component";
import {HttpClient} from "@angular/common/http";
import {HotelsService} from "../../../../services/api/hotels/hotels.service";
import {HotelItem} from "../../../../models/hotel-item";
import {Store} from "@ngrx/store";
import {setHotelList} from "../../../../services/store/hotelList/hotelList.actions";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    InputComponent,
    DatepickerComponent,
    CounterComponent,
    ButtonComponent,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss',],
})
export class SearchComponent{
  counter:number = 1;
  city:String = '';
  startDate:String = '';
  endDate:String = '';
  constructor(private hotelService: HotelsService, private store: Store) {
    this.startDate = new Date().toISOString().split("T")[0];
    this.endDate = new Date().toISOString().split("T")[0];
  }
  startDateChangeHandler(value: String):void {
    this.startDate = value;
  }
  endDateChangeHandler(value: String):void {
    this.endDate = value;
  }
  onCounterChangeHandler(counter:number):void {
    this.counter = counter;
  }
  onSearchChangeHandler(value:String):void {
    this.city = value;
  }
  submit():void {
    this.hotelService.getHotelsWithParams(
      this.city,
      this.startDate,
      this.endDate,
      this.counter
    ).subscribe((hotelList:HotelItem[]) => {
      this.store.dispatch(setHotelList({ hotelList }));
    });
  }
}



