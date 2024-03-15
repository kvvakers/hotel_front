import { Component } from '@angular/core';
import {HotelItemComponent} from "../hotel-item/hotel-item.component";

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [
    HotelItemComponent
  ],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent {

}
