import {Component} from "@angular/core";
import {ButtonComponent} from "../../../../controls/button/button.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-tab-room-item',
  standalone: true,
  imports: [
    ButtonComponent,
    NgClass
  ],
  templateUrl: './tab-room-item.component.html',
  styleUrl: './../../account.component.scss',
})
export class TabRoomItemComponent {
}
