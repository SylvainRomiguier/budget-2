import { Password } from "../../User/Password";

export interface ICryptoProvider {
  hashPassword: (password: Password) => Promise<{ hash: string; salt: string }>;
  comparePassword: (
    password: Password,
    salt: string,
    hash: string
  ) => Promise<boolean>;
  md5hash: (text: string) => string;
}


