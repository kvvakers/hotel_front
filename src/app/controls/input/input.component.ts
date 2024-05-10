import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() onChange = new EventEmitter<String>

  onChangeEmit(event:any):void {
    this.onChange.emit(event.target.value);
  }
}
