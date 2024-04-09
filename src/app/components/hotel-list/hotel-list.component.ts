import {Component, Input} from '@angular/core';
import {HotelItemComponent} from "../hotel-item/hotel-item.component";
import {HotelItem} from "../../models/hotel-item";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [
    NgForOf,
    HotelItemComponent,
    NgIf
  ],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent {
@Input() list: HotelItem[] = [];
}
