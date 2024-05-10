import {Component} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
import {ButtonComponent} from "../../controls/button/button.component";
import {setIsAuthorized} from "../../services/store/account/account.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  imports: [
    RouterLink,
    ButtonComponent
  ]
})
export class LogoutComponent {
  constructor(private router: Router, private store: Store) { }

  logout(): void {
    localStorage.removeItem("access_token");
    this.store.dispatch(setIsAuthorized({ isAuthorized: false }))
    this.router.navigate(["home"]);
  }
}
