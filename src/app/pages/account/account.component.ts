import {Component, OnInit} from "@angular/core";
import {ButtonComponent} from "../../controls/button/button.component";
import {NgClass, NgForOf} from "@angular/common";
import {TabHotelItemComponent} from "./components/tab-hotel-item/tab-hotel-item.component";
import {HotelItemUI} from "./models/interface-hotel-ui";
import {Tab} from "./models/tab";
import {AccountService} from "../../services/api/account/account.service";
import {User} from "../../models/user";
import {HotelsService} from "../../services/api/hotels/hotels.service";
import {Router, RouterLink} from "@angular/router";
import {HotelItem} from "../../models/hotel-item";
import {Store} from "@ngrx/store";
import {setIsAuthorized} from "../../services/store/account/account.actions";
import {IRespondedUser} from "../../models/responded-user-interface";
import {RoomsService} from "../../services/api/rooms/rooms.service";
import {Deal} from "../../models/deal";
import {DealsService} from "../../services/api/deals/deals.service";
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ButtonComponent,
    NgClass,
    TabHotelItemComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit{
  user: User = new User();
  tabStatus: Tab = Tab.HOTELS;
  hotelList: HotelItemUI[] = [];
  deals: Deal[] = [];
  books: Deal[] = [];

  constructor(
    private accountService: AccountService,
    private hotelService: HotelsService,
    private dealsService: DealsService,
    private router: Router,
    private store: Store
  ) {
  }
  ngOnInit():void {
    this.getMe();

  }
  changeTab(value: Tab):void {
    this.tabStatus = value;
  }

  getMe(): void {
    this.accountService.getUserData().subscribe((data: IRespondedUser): void => {
      this.user.setEmail(data.email);
      this.user.setFirstName(data.name);
      this.user.setSurname(data.surname);
      this.user.setPhone(data.phone);

      this.store.dispatch(setIsAuthorized({ isAuthorized: true }));

      this.getMy();
    }, (): void => {
      this.store.dispatch(setIsAuthorized({ isAuthorized: false }));
      this.router.navigate(["account/auth"]);
    });
  }
  getMy(): void {
    this.hotelService.getMyHotels().subscribe((data: HotelItem[]): void => {
      data.forEach((item: HotelItem): void => {
        this.hotelList.push(new HotelItemUI(this.hotelList.length, false, item));
      })
    });
    this.dealsService.getDeals().subscribe((data: Deal[]): void => {
      this.deals = data;
    })
    this.dealsService.getBooks().subscribe((data: Deal[]): void => {
      this.books = data;
    })
  }

  ListToggleHandler(id: number) : void {
   for (let i : number = 0; i < this.hotelList.length; ++i) {
     if (this.hotelList[i].getId() == id) this.hotelList[i].invertIsOpened();
   }
  }

  // ------
  protected readonly Tab = Tab;
}
