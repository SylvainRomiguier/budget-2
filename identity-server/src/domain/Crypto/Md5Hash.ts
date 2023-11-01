import { ProvidersService } from "../IOC/ProvidersService";
import { SERVICE_NAMES } from "../IOC/ServiceNames.constants";
import { ICryptoProvider } from "../IOC/interfaces/Crypto.interface";

export class Md5Hash {
  constructor(private providersService: ProvidersService) {}
  getMd5Hash(text: string) {
    return this.providersService
      .getProvider<ICryptoProvider>(SERVICE_NAMES.CRYPTO_PROVIDER)
      .get()
      .md5hash(text);
  }
}
