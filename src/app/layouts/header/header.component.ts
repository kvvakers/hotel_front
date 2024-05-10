import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MenuComponent} from "./components/menu/menu.component";
import {Store} from "@ngrx/store";
import {setIsAuthorized} from "../../services/store/account/account.actions";
import {selectIsAuthorized} from "../../services/store/account/account.selectors";
import {Subscription} from "rxjs";

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
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthorized: boolean = false;
  subscription!: Subscription;

  constructor(private store: Store) {
  }
  ngOnInit() : void {
    this.subscription = this.store
      .select(selectIsAuthorized)
      .subscribe((value: boolean) =>  this.isAuthorized = value);

    const token: string | null = localStorage.getItem("access_token");
    if (!token) return;

    this.isAuthorized = true;
    this.store.dispatch(setIsAuthorized({ isAuthorized: this.isAuthorized }))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


