import {Component, Input, OnInit} from "@angular/core";
import {ButtonComponent} from "../../../../controls/button/button.component";
import {NgClass, NgIf} from "@angular/common";
import {RoomItem} from "../../../../models/room-item";
import {ImageSliderComponent} from "../../../../controls/image-slider/image-slider.component";
import {RoomsService} from "../../../../services/api/rooms/rooms.service";

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

  constructor(private roomService: RoomsService) {}

  changeAccessibility() {
    this.roomService.changeRoomStatus(this.room.getId())
      .subscribe((res): void => {
      }, (err): void => {
        if (err.status == 200) {
          this.room.setStatus(!this.room.getStatus());
          return;
        }
        console.log("changeRoomStatus err", err);
      })
  }

}
