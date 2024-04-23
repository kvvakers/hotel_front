import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HeroComponent} from "./components/hero/hero.component";
import {HotelListComponent} from "../../components/hotel-list/hotel-list.component";
import {HotelItem} from "../../models/hotel-item";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectHotelList} from "../../services/store/hotelList/hotelList.selectors";

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [HeroComponent, HotelListComponent],
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit, OnDestroy {
  hotelList: HotelItem[] = [];
  private hotelsSubscription: Subscription | undefined;
  constructor(private store: Store) { }


  ngOnInit(): void {
      this.hotelsSubscription = this.store
        .select(selectHotelList)
        .subscribe(hotels => {
          this.hotelList = [ ...hotels ];
        });
  }
  ngOnDestroy(): void {
    if (this.hotelsSubscription) {
      this.hotelsSubscription.unsubscribe();
    }
  }
}
