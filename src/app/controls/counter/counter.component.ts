import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  @Input() unitOfMeasure: string = '';
  @Output() onChange = new EventEmitter<number>;
  counter: number = 1;

  increment():void {
    this.counter < 100 ? this.counter++ : null;
    this.emit();
  }
  decrement():void {
    this.counter > 0 ? this.counter-- : null;
    this.emit();
  }
  emit():void {
    this.onChange.emit(this.counter);
  }
}
