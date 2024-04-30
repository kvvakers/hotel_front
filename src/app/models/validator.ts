export class Validator {
  public static validateEmail(email: String): boolean {
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString()))
  }
  public static validatePassword(password:String):boolean {
    return password.length >= 5;
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
