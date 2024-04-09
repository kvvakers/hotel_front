import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonComponent} from "../../../controls/button/button.component";
import {CounterComponent} from "../../../controls/counter/counter.component";
import {DatepickerComponent} from "../../../controls/datepicker/datepicker.component";
import {InputComponent} from "../../../controls/input/input.component";
import {HotelItem} from "../../../models/hotel-item";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectHotelList} from "../../../services/store/hotelList/hotelList.selectors";

@Component({
  selector: 'app-search',
  standalone: true,
    imports: [
        ButtonComponent,
        CounterComponent,
        DatepickerComponent,
        InputComponent
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() hotelItemsChanged = new EventEmitter<HotelItem[]>();

  counter:number = 1;
  startDate:String = '';
  endDate:String = '';
  constructor() {
    this.startDate = new Date().toISOString().split("T")[0];
    this.endDate = new Date().toISOString().split("T")[0];
    this.submit();
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
  submit():void {
    console.log("submitted!");
  }
}
