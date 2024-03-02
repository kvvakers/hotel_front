import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrls: ['../../app.component.scss', './button.component.scss']
})
export class ButtonComponent {
  @Input() isActive: Boolean = true;
}
