import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SearchComponent} from "./components/search/search.component";
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectHotelList} from "../../services/store/hotelList/hotelList.selectors";
import {HotelItem} from "../../models/hotel-item";
import {map, Observable, Subscription} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {RoomItem} from "../../models/room-item";
import {ButtonComponent} from "../../controls/button/button.component";
import {RoomsService} from "../../services/api/rooms/rooms.service";
import {setHotelList} from "../../services/store/hotelList/hotelList.actions";
import {ImageSliderComponent} from "../../controls/image-slider/image-slider.component";
import {Deal} from "../../models/deal";
import {selectIsAuthorized} from "../../services/store/account/account.selectors";
import {DealsService} from "../../services/api/deals/deals.service";

@Component({
  selector: 'app-hotel-item',
  standalone: true,
  imports: [
    SearchComponent,
    NgIf,
    NgForOf,
    ButtonComponent,
    ImageSliderComponent
  ],
  templateUrl: './hotel-item.component.html',
  styleUrl: './hotel-item.component.scss'
})
export class HotelItemComponent implements OnInit, OnDestroy {
  hotelId: number = 0;
  hotel: HotelItem | undefined;
  hotels: HotelItem[] = [];
  private hotels$: Observable<HotelItem[]> | undefined;
  private hotelsSubscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;
  private startDate!: String;
  private endDate!: String;
  constructor(private route: ActivatedRoute, private router: Router, private store: Store, private dealsService: DealsService) {}

  ngOnInit(): void {
   this.routeSubscription =  this.route.params.subscribe(params => {
      this.hotelId = params['id'];

      this.hotels$ = this.store.pipe(select(selectHotelList));
      this.hotelsSubscription = this.hotels$.subscribe(hotels => {
        this.hotels = hotels;
        this.hotel = hotels.find(item => item.getId() == this.hotelId);
      });
    });
  }
  ngOnDestroy(): void {
    if (this.hotelsSubscription) {
      this.hotelsSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  onRoomsItemsChanged(roomItems: RoomItem[]): void{
    if (this.hotel == undefined) return;
    this.hotel = new HotelItem(
      this.hotelId,
      this.hotel.getName(),
      this.hotel.getImage(),
      this.hotel.getDescription(),
      this.hotel.getCityName(),
      this.hotel.getRating(),
      roomItems
    )
  }

  onStartDateChanged(value: String): void {
    this.startDate = value;
  }
  onEndDateChanged(value: String): void {
    this.endDate = value;
  }
  book(id: number): void {
    const temp: Subscription = this.store.select(selectIsAuthorized).subscribe((data: boolean): void => {
      if (data) {
        this.dealsService.book(new Deal(id, this.startDate, this.endDate)).subscribe(data => {

        }, error => {
          temp.unsubscribe();
          if (error.status == 200) alert("book success!");
        });
      } else {
        this.router.navigate(["account/auth"]).then((): void => {
          temp.unsubscribe()
        });
      }
    });
  }
}
