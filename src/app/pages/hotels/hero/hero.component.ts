import { Component } from '@angular/core';
import {SearchComponent} from "./search/search.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    SearchComponent
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss', '../../../app.component.scss']
})
export class HeroComponent {

}
