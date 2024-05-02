import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ButtonComponent} from "../../../../controls/button/button.component";
import {NgClass, NgIf} from "@angular/common";
import {TabRoomItemComponent} from "../tab-room-item/tab-room-item.component";
import {IHotelUI} from "../../models/interface-hotel-ui";

@Component({
  selector: 'app-tab-hotel-item',
  standalone: true,
  imports: [
    ButtonComponent,
    NgClass,
    TabRoomItemComponent,
    NgIf,
  ],
  templateUrl: './tab-hotel-item.component.html',
  styleUrl: './../../account.component.scss',
})
export class TabHotelItemComponent {
  @Input() hotelUI : IHotelUI | undefined;
  @Output() onListToggle : EventEmitter<number> = new EventEmitter<number>();

  toggle() : void {
    this.onListToggle.emit((this.hotelUI != undefined ? this.hotelUI.id : -1));
  }
}
