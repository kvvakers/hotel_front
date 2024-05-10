export class FormItem {
  placeholder: string = "";
  action: (value: String) => void;
  name: string = "";
  initValue: string = "";

  constructor(placeholder: string, action: (value: String) => void, name: string, initValue: string) {
    this.placeholder = placeholder;
    this.action = action;
    this.name = name;
    this.initValue = initValue;
  }
}
