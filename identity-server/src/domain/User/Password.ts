import { ValueObject } from "../ValueObject";

export class Password extends ValueObject<string>{
  constructor(password: unknown) {
    if (typeof password !== "string") {
      throw new Error("Password should be a string.");
    }
    super(password);
    const validation = /^[\w#$%&]{8,15}$/;
    const validationNumber = /\d/;
    const validationSpecialCharacter = /[#$%&]/;
   
    if (
      !validation.test(password) ||
      !validationNumber.test(password) ||
      !validationSpecialCharacter.test(password)
    ) {
      throw new Error(
        "Password should contain at least a special character # $ % &, a letter, a number, at least 8 characters, at most 15 characters."
      );
    }
    this._value = password;
  }
}
