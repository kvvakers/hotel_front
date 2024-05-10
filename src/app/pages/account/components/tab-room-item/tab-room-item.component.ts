import {Component, Input} from "@angular/core";
import {ButtonComponent} from "../../../../controls/button/button.component";
import {NgClass, NgIf} from "@angular/common";
import {RoomItem} from "../../../../models/room-item";
import {ImageSliderComponent} from "../../../../controls/image-slider/image-slider.component";

@Component({
  selector: 'app-tab-room-item',
  standalone: true,
  imports: [
    ButtonComponent,
    NgClass,
    ImageSliderComponent,
    NgIf
  ],
  templateUrl: './tab-room-item.component.html',
  styleUrl: './../../account.component.scss',
})
export class TabRoomItemComponent {
  @Input({ required: true }) room!: RoomItem;
}
