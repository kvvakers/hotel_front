import {Component, OnInit} from "@angular/core";
import {ButtonComponent} from "../../controls/button/button.component";
import {NgClass, NgForOf} from "@angular/common";
import {TabHotelItemComponent} from "./components/tab-hotel-item/tab-hotel-item.component";
import {IHotelUI} from "./models/interface-hotel-ui";
import {Tab} from "./models/tab";
import {HotelItem} from "../../models/hotel-item";
import {AccountService} from "../../services/api/account/account.service";
import {User} from "../../models/user";
import {IRespondedUser} from "../../models/responded-user-interface";
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ButtonComponent,
    NgClass,
    TabHotelItemComponent,
    NgForOf
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

  hotelList: IHotelUI[] = [
    {
      id: 0,
      isOpened: false,
      item: {},
    },
    {
      id: 1,
      isOpened: false,
      item: {},
    },
    {
      id: 2,
      isOpened: false,
      item: {},
    },
    {
      id: 3,
      isOpened: false,
      item: {},
    },
  ];

  constructor(private accountService: AccountService) {
  }
  ListToggleHandler(id: number) : void {
   for (let i : number = 0; i < this.hotelList.length; ++i) {
     if (this.hotelList[i].id == id) this.hotelList[i].isOpened = !this.hotelList[i].isOpened;
   }
    console.log(this.hotelList)
  }
  ngOnInit():void {
    this.accountService.getUserData().subscribe(data => {
      this.user.setEmail(data.email);
      this.user.setFirstName(data.name);
      this.user.setSurname(data.surname);
      this.user.setPhone(data.phone);
    });
  }
  // ------
  protected readonly Tab = Tab;
}
