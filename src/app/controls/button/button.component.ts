import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() isActive: Boolean = true;
  @Output() onClick = new EventEmitter<void>;

  onClickEmit():void {
    this.onClick.emit();
  }
}
