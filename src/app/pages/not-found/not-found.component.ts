import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  imports: [
    RouterLink
  ]
})
export class NotFoundComponent {}
