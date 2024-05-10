import { Routes } from '@angular/router';
import {HotelsComponent} from "./pages/hotels/hotels.component";
import {HotelItemComponent} from "./pages/hotel-item/hotel-item.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {RegComponent} from "./pages/reg/reg.component";
import {AccountComponent} from "./pages/account/account.component";
import {AddHotelComponent} from "./pages/add-hotel/add-hotel.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {LogoutComponent} from "./pages/logout/logout.component";

export const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", component: HotelsComponent},
  {path: "hotel/:id", component: HotelItemComponent},
  {path: "account/auth", component: AuthComponent},
  {path: "account/reg", component: RegComponent},
  {path: "account/exit", component: LogoutComponent},
  {path: "account", component: AccountComponent},
  {path: "account/add-hotel/:id", component: AddHotelComponent},
  {path: "**", redirectTo: "404", pathMatch: "full"},
  {path: "404", component: NotFoundComponent}
];
