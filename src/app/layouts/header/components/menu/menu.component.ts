import {Component, Input} from '@angular/core';
import {ButtonComponent} from "../../../../controls/button/button.component";
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
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input({ required: true }) isAuthorized!: boolean;
  menuItems:IMenuItem[] = [
    {name: "Hotels", url: "/home"},
    {name: "Countries", url: "/countries"},
    {name: "About", url: "/about"},
    {name: "Account", url: "/account"},
  ];
  buttonItems:IButtonItem[] = [
    {name: "Sign in", isActive: false, link: "/account/auth"},
    {name: "Sign up", isActive: true, link: "/account/reg"}
  ];
}
interface IMenuItem {
  name: String;
  url: String;
}
interface IButtonItem {
  name: String;
  isActive: Boolean;
  link: String;
}
