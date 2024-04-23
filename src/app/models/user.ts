export class User {
  private email: String = "";
  private password: String = "";
  private firstName: String = "";
  private surname: String = "";
  private phone: String = "";

  setEmail(email: String) {
    this.email = email;
  }
  setPassword(password: String) {
    this.password = password;
  }
  setFirstName(firstName: String) {
    this.firstName = firstName;
  }
  setSurname(surname: String) {
    this.surname = surname;
  }
  setPhone(phone: String) {
    this.phone = phone;
  }
  get isValid(): boolean {
    return (this.email.length > 0 &&
      this.password.length > 0 &&
      this.firstName.length > 0 &&
      this.surname.length > 0 &&
      this.phone.length > 0
    );
  }
}
