import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ButtonComponent} from "../../../../controls/button/button.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TabRoomItemComponent} from "../tab-room-item/tab-room-item.component";
import {HotelItemUI} from "../../models/interface-hotel-ui";
import {RouterLink} from "@angular/router";
import {ImageSliderComponent} from "../../../../controls/image-slider/image-slider.component";

@Component({
  selector: 'app-tab-hotel-item',
  standalone: true,
  imports: [
    ButtonComponent,
    NgClass,
    TabRoomItemComponent,
    NgIf,
    NgForOf,
    RouterLink,
    ImageSliderComponent,
  ],
  templateUrl: './tab-hotel-item.component.html',
  styleUrl: './../../account.component.scss',
})
export class TabHotelItemComponent {
  @Input({ required: true }) hotelUI!: HotelItemUI;
  @Output() onListToggle : EventEmitter<number> = new EventEmitter<number>();

  toggle() : void {
    this.onListToggle.emit(this.hotelUI.getId());
  }
}
