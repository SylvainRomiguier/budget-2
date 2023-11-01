import { ICryptoProvider } from "../domain/IOC/interfaces/Crypto.interface";
import { randomBytes, pbkdf2, createHash } from "node:crypto";
import { Password } from "../domain/User/Password";

export class CryptoProvider implements ICryptoProvider {
    
  async hashPassword(
    password: Password
  ): Promise<{ hash: string; salt: string }> {
    const salt = randomBytes(16).toString("hex");
    return new Promise((resolve, reject) => {
      pbkdf2(password.value, salt, 1000, 64, "sha512", (error, derivedKey) => {
        if (error) {
          return reject(error);
        }
        return resolve({ hash: derivedKey.toString("hex"), salt });
      });
    });
  }

  async comparePassword(
    password: Password,
    salt: string,
    hash: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      pbkdf2(password.value, salt, 1000, 64, "sha512", (error, derivedKey) => {
        if (error) {
          return reject(error);
        }
        return resolve(hash === derivedKey.toString("hex"));
      });
    });
  }

  md5hash(text: string) {
    return createHash("md5").update(text).digest("hex");
  }
}
