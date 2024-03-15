import { Component } from '@angular/core';
import {InputComponent} from "../../../../controls/input/input.component";
import {DatepickerComponent} from "../../../../controls/datepicker/datepicker.component";
import {CounterComponent} from "../../../../controls/counter/counter.component";
import {ButtonComponent} from "../../../../controls/button/button.component";

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
export class SearchComponent {
  counter:number = 1;
  city:String = '';
  startDate:String = '';
  endDate:String = '';
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
    const data: ISearchParams = {
      counter: this.counter,
      city: this.city,
      startDate: this.startDate,
      endDate: this.endDate,
    }
    console.log(data);
  }
}

interface ISearchParams {
  counter:number;
  city:String;
  startDate:String;
  endDate:String;
}

