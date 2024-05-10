import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layouts/header/header.component";
import { FooterComponent } from "./layouts/footer/footer.component";
import {HotelsService} from "./services/api/hotels/hotels.service";
import {HotelItem} from "./models/hotel-item";
import {setHotelList} from "./services/store/hotelList/hotelList.actions";
import {Store} from "@ngrx/store";
import {ImageSliderComponent} from "./controls/image-slider/image-slider.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ImageSliderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private hotelService: HotelsService, private store: Store) { }
    ngOnInit() : void {
    this.hotelService.getHotelsWithoutParams()
      .subscribe((hotelList:HotelItem[]) => {
        this.store.dispatch(setHotelList({ hotelList }));
      });
  }
}
