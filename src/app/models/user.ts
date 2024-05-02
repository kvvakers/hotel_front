export class User {
  private email: String = "";
  private password: String = "";
  private name: String = "";
  private surname: String = "";
  private phone: String = "";


  setEmail(email: String) {
    this.email = email;
  }
  setPassword(password: String) {
    this.password = password;
  }
  setFirstName(firstName: String) {
    this.name = firstName;
  }
  setSurname(surname: String) {
    this.surname = surname;
  }
  setPhone(phone: String) {
    this.phone = phone;
  }

  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getFirstName() {
    return this.name;
  }
  getSurname() {
    return this.surname;
  }
  getPhone() {
    return this.phone;
  }
  get isValid(): boolean {
    return (this.email.length > 0 &&
      this.password.length > 0 &&
      this.name.length > 0 &&
      this.surname.length > 0 &&
      this.phone.length > 0
    );
  }
}
