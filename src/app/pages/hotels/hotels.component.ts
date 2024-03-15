import { Component } from '@angular/core';
import {HeroComponent} from "./hero/hero.component";
import {HotelListComponent} from "../../components/hotel-list/hotel-list.component";

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [HeroComponent, HotelListComponent],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent {

}
