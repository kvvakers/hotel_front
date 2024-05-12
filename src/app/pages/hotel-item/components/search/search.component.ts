import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonComponent} from "../../../../controls/button/button.component";
import {CounterComponent} from "../../../../controls/counter/counter.component";
import {DatepickerComponent} from "../../../../controls/datepicker/datepicker.component";
import {InputComponent} from "../../../../controls/input/input.component";
import {HotelItem} from "../../../../models/hotel-item";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectHotelList} from "../../../../services/store/hotelList/hotelList.selectors";
import {RoomsService} from "../../../../services/api/rooms/rooms.service";
import {RoomItem} from "../../../../models/room-item";
import {ActivatedRoute} from "@angular/router";

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
export class SearchComponent implements OnInit{
  @Output() roomItemsChanged = new EventEmitter<RoomItem[]>();
  @Output() startDateChanged = new EventEmitter<String>();
  @Output() endDateChanged = new EventEmitter<String>();
  counter:number = 1;
  hotelId: number = 0;
  startDate:String = '';
  endDate:String = '';
  constructor(private roomService: RoomsService, private route: ActivatedRoute,) {
    this.startDate = new Date().toISOString().split("T")[0];
    this.endDate = new Date().toISOString().split("T")[0];
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = params['id'];
    });
    this.startDateChanged.emit(this.startDate);
    this.endDateChanged.emit(this.endDate);
  }
  startDateChangeHandler(value: String):void {
    this.startDate = value;
    this.startDateChanged.emit(value);
  }
  endDateChangeHandler(value: String):void {
    this.endDate = value;
    this.endDateChanged.emit(value);
  }
  onCounterChangeHandler(counter:number):void {
    this.counter = counter;
  }
  submit():void {
    let roomItems: RoomItem[] = [];
    console.log(this.hotelId);
    this.roomService.getRoomsWithParams(+this.hotelId, this.startDate, this.endDate, this.counter).subscribe(items => {
      roomItems = items;
      this.roomItemsChanged.emit(roomItems);
      console.log(roomItems);
    });
  }
}
