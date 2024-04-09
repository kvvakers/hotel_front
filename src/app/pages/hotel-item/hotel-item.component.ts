import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchComponent} from "./search/search.component";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectHotelList} from "../../services/store/hotelList/hotelList.selectors";
import {HotelItem} from "../../models/hotel-item";
import {Observable, Subscription} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {RoomItem} from "../../models/room-item";
import {ButtonComponent} from "../../controls/button/button.component";

@Component({
  selector: 'app-hotel-item',
  standalone: true,
  imports: [
    SearchComponent,
    NgIf,
    NgForOf,
    ButtonComponent
  ],
  templateUrl: './hotel-item.component.html',
  styleUrl: './hotel-item.component.scss'
})
export class HotelItemComponent implements OnInit, OnDestroy {
  hotelId: number = 0;
  hotel: HotelItem | undefined;
  private hotels$: Observable<HotelItem[]> | undefined;
  private hotelsSubscription: Subscription | undefined;
  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = params['id'];

      this.hotels$ = this.store.pipe(select(selectHotelList));
      this.hotelsSubscription = this.hotels$.subscribe(hotels => {
        this.hotel = hotels.find(item => item.getId() == this.hotelId);
        console.log('hotel id:', this.hotelId, this.hotel);
      });
    });
  }
  ngOnDestroy(): void {
    if (this.hotelsSubscription) {
      this.hotelsSubscription.unsubscribe();
    }
  }

  protected readonly RoomItem = RoomItem;
}
