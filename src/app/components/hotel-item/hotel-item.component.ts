import {Component, Input} from '@angular/core';
import {HotelItem} from "../../models/hotel-item";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-hotel-item',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './hotel-item.component.html',
  styleUrl: './hotel-item.component.scss'
})
export class HotelItemComponent {
 @Input() hotelItem: HotelItem | null = null;
}
