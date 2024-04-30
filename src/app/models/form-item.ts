export class FormItem {
  placeholder: string = "Email";
  action: (value: String) => void;
  name: string = "Enter email *";


  constructor(placeholder: string, action: (value: String) => void, name: string) {
    this.placeholder = placeholder;
    this.action = action;
    this.name = name;
  }
}
