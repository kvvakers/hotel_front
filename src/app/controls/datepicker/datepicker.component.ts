import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {
  @Output() onStartDateChange = new EventEmitter<String>();
  @Output() onEndDateChange = new EventEmitter<String>();

  startDate: NormalDate;
  endDate: NormalDate;
  maxDate: String;

  constructor() {
    this.startDate = new NormalDate();
    this.endDate = new NormalDate();

    this.maxDate = this.getMaxDate();
  }

  getMaxDate() : String {
    let date = new NormalDate();
    date.setDate(this.startDate.getDate() + 30);
    return date.getNormalDate();
  }

  startDateEmit(event: any): void {
    this.startDate = new NormalDate(event.target.value);
    this.maxDate = this.getMaxDate();
    this.onStartDateChange.emit(event.target.value);
  }

  endDateEmit(event: any): void {
    this.endDate = new NormalDate(event.target.value);
    this.onEndDateChange.emit(event.target.value);
  }
}
class NormalDate extends Date {
  getNormalDate(): String {
    return this.toISOString().split("T")[0];
  }
}
