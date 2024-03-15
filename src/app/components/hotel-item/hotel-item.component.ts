import { Component } from '@angular/core';
import {HotelItem} from "../../models/hotel-item";

@Component({
  selector: 'app-hotel-item',
  standalone: true,
  imports: [],
  templateUrl: './hotel-item.component.html',
  styleUrl: './hotel-item.component.scss'
})
export class HotelItemComponent {
  hotelItem: HotelItem = new HotelItem('name', '../../assets/img/temp.png', 'description', 300, 'cityName', 4);
}
