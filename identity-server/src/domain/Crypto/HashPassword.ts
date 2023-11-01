import { ProvidersService } from "../IOC/ProvidersService";
import { SERVICE_NAMES } from "../IOC/ServiceNames.constants";
import { ICryptoProvider } from "../IOC/interfaces/Crypto.interface";
import { Password } from "../User/Password";

export class HashPassword {
  constructor(private providersService: ProvidersService) {}
  async getHash(_password: string): Promise<{ hash: string; salt: string }> {
    const password = new Password(_password);
    return this.providersService
      .getProvider<ICryptoProvider>(SERVICE_NAMES.CRYPTO_PROVIDER)
      .get()
      .hashPassword(password);
  }
}
