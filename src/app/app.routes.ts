import { Routes } from '@angular/router';
import {HotelsComponent} from "./pages/hotels/hotels.component";
import {HotelItemComponent} from "./pages/hotel-item/hotel-item.component";

export const routes: Routes = [
  {path: "", component: HotelsComponent},
  {path: "hotel/:id", component: HotelItemComponent},
];
