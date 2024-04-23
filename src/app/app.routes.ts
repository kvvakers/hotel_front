import { Routes } from '@angular/router';
import {HotelsComponent} from "./pages/hotels/hotels.component";
import {HotelItemComponent} from "./pages/hotel-item/hotel-item.component";
import {AuthComponent} from "./pages/auth/auth/auth.component";
import {RegComponent} from "./pages/reg/reg/reg.component";

export const routes: Routes = [
  {path: "", component: HotelsComponent},
  {path: "hotel/:id", component: HotelItemComponent},
  {path: "account/auth", component: AuthComponent},
  {path: "account/reg", component: RegComponent},
];
