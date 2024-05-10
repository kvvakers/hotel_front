import { Component } from '@angular/core';
import {ButtonComponent} from "../../controls/button/button.component";
import {InputComponent} from "../../controls/input/input.component";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../models/user";
import {FormItem} from "../../models/form-item";
import {AccountService} from "../../services/api/account/account.service";
import {IRespondedUser} from "../../models/responded-user-interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
    imports: [
        ButtonComponent,
        InputComponent,
        NgForOf,
        NgIf
    ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent  {
  user:User = new User();
  error: string = "";
  formItems: FormItem[] = [
    {
      placeholder: "Email",
      action: (value: String) => this.user.setEmail(value),
      name: "Enter email *",
      initValue: "",
    },
    {
      placeholder: "Password",
      action: (value: String) => this.user.setPassword(value),
      name: "Enter password *",
      initValue: "",
    },
  ];

  constructor(private accountService: AccountService, private router: Router) {
  }
  submit(): void {
    if (this.user.isValid) return;
    this.accountService.authorization(this.user).subscribe(
      (data: IRespondedUser) => {
        this.error = "";
        if (data.token.length > 0) {
          localStorage.setItem("access_token", data.token);
          this.router.navigate(['account']);
        }
      },
      (error) => {
        this.error = error.error;
        localStorage.removeItem("access_token")
      }
    );
  }
}

