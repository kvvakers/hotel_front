import { Component } from '@angular/core';
import {ButtonComponent} from "../../controls/button/button.component";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    ButtonComponent,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['../../app.component.scss', './menu.component.scss']
})
export class MenuComponent {
  menuItems:MenuItem[] = [
    new MenuItem("Hotels", ""),
    new MenuItem("Countries", "/countries"),
    new MenuItem("About", "/about"),
    new MenuItem("Account", "/account"),
  ];
  buttonItems:ButtonItem[] = [
    {name: "Sign in", isActive: false},
    {name: "Sign up", isActive: true}
  ];
  isNotAuthorized:Boolean = true;
}
class MenuItem {
  name: String;
  url: String;
  constructor(name:String, url:String) {
    this.name = name;
    this.url = url;
  }
}
class ButtonItem {
  name: String;
  isActive: Boolean;

  constructor(name:String, isActive:Boolean) {
    this.name = name;
    this.isActive = isActive;
  }
}
