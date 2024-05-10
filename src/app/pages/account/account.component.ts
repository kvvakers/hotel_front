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
import {selectIsAuthorized} from "../../services/store/account/account.selectors";
import {setIsAuthorized} from "../../services/store/account/account.actions";
import {IRespondedUser} from "../../models/responded-user-interface";
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
  changeTab(value: Tab):void {
    this.tabStatus = value;
  }

  hotelList: HotelItemUI[] = [];

  constructor(
    private accountService: AccountService,
    private hotelService: HotelsService,
    private router: Router,
    private store: Store
  ) {
  }
  ngOnInit():void {
    this.getMe();

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
  }

  ListToggleHandler(id: number) : void {
   for (let i : number = 0; i < this.hotelList.length; ++i) {
     if (this.hotelList[i].getId() == id) this.hotelList[i].invertIsOpened();
   }
  }

  // ------
  protected readonly Tab = Tab;
}
