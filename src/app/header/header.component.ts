import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MenuComponent} from "./menu/menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgForOf,
    RouterLinkActive,
    RouterLink,
    MenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './../app.component.scss'
})
export class HeaderComponent {

}


