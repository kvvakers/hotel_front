import { Component } from '@angular/core';
import {InputComponent} from "../../../controls/input/input.component";
import {ButtonComponent} from "../../../controls/button/button.component";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../../models/user";

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
  formItems: Item[] = [
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
      name: "Enter email *"
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
      name: "Enter password *"
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
      name: "Enter first name *"
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
      name: "Enter surname *"
    },
    {
      placeholder: "Phone",
      action: (value: String) => {
        if (Validator.validatePhone(value)) {
          this.user.setPhone(value);
          this.error = "";
          return;
        }
        this.error = "Phone is not correct"
      },
      name: "Enter phone *"
    },
  ];
  submit(): void {
    if (this.error.length != 0 || this.user.isValid) return;
    console.log(this.user);
  }
}
class Validator {
  public static validateEmail(email: String): boolean {
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString()))
  }
  public static validatePassword(password:String):boolean {
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.toString()))
  }
  public static validateFirstName(firstName:String):boolean {
    return (/^[a-zA-Z]{2,}$/.test(firstName.toString()))
  }
  public static validateSurname(surname:String):boolean {
    return (/^[a-zA-Z]{2,}$/.test(surname.toString()))
  }
  public static validatePhone(phone:String):boolean {
    return (/^\d{10,12}$/.test(phone.split(' ').join('').toString()))
  }
}

class Item {
  placeholder: string = "Email";
  action: (value: String) => void;
  name: string = "Enter email *";


  constructor(placeholder: string, action: (value: String) => void, name: string) {
    this.placeholder = placeholder;
    this.action = action;
    this.name = name;
  }
}
