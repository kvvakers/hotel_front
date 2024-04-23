import {Component, EventEmitter, Output} from '@angular/core';
import {SearchComponent} from "../search/search.component";
import {HotelItem} from "../../../../models/hotel-item";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    SearchComponent
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss', '../../../../app.component.scss']
})
export class HeroComponent {
  @Output() hotelItemsChanged = new EventEmitter<HotelItem[]>();
  onHotelItemsChanged(hotelItems: HotelItem[]): void {
    this.hotelItemsChanged.emit(hotelItems);
  }
}
