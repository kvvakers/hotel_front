import { Component } from '@angular/core';
import {InputComponent} from "../../controls/input/input.component";
import {ButtonComponent} from "../../controls/button/button.component";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../models/user";
import {FormItem} from "../../models/form-item";
import {Validator} from "../../models/validator";
import {AccountService} from "../../services/api/account/account.service";
import {IRespondedUser} from "../../models/responded-user-interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss'
})
export class RegComponent {
  user:User = new User();
  error: string = "";
  success: string = "";
  formItems: FormItem[] = [
    {
      placeholder: "Email",
      action: (value: String) => {
       if (Validator.validateEmail(value)) {
         this.user.setEmail(value);
         this.error = "";
         return;
       }
       this.error = "Email is not correct";
      },
      name: "Enter email *",
      initValue: "",
    },
    {
      placeholder: "Password",
      action: (value: String) => {
        if (Validator.validatePassword(value)) {
          this.user.setPassword(value);
          this.error = "";
          return
        }
        this.error = "Password is not correct"
      },
      name: "Enter password *",
      initValue: "",
    },
    {
      placeholder: "First name",
      action: (value: String) => {
        if (Validator.validateFirstName(value)) {
          this.user.setFirstName(value);
          this.error = "";
          return
        }
        this.error = "First name is not correct"
      },
      name: "Enter first name *",
      initValue: "",
    },
    {
      placeholder: "Surname",
      action: (value: String) => {
        if(Validator.validateSurname(value)) {
          this.user.setSurname(value);
          this.error = "";
          return;
        }
        this.error = "Surname is not correct"
      },
      name: "Enter surname *",
      initValue: "",
    },
    {
      placeholder: "Phone",
      action: (value: String) => {
        if (Validator.validatePhone(value)) {
          this.user.setPhone(value);
          this.error = "";
          return;
        }
        this.error = "Phone is not correct";
      },
      name: "Enter phone *",
      initValue: "",
    },
  ];

  constructor(private accountService: AccountService, private router: Router) {

  }
  submit(): void {
    if (!this.user.isValid) return;
    this.accountService.registration(this.user)
      .subscribe(
      (data: IRespondedUser) => {
        this.error = "";
        this.success = "You are molodets!";
        if (data.token.length > 0) {
          localStorage.setItem("access_token", data.token);
          this.router.navigate(['account']);
        }
      },
      (error) => {
        this.success = "";
        this.error = error.error;
        localStorage.removeItem("access_token")
      });
  }
}



