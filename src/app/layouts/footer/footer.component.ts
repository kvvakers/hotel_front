import { Component } from '@angular/core';
import {MenuComponent} from "../header/components/menu/menu.component";

@Component({
  selector: 'app-footer',
  standalone: true,
    imports: [
        MenuComponent
    ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
