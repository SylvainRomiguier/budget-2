import {ProvidersService } from "../IOC/ProvidersService";
import { SERVICE_NAMES } from "../IOC/ServiceNames.constants";
import { ICryptoProvider } from "../IOC/interfaces/Crypto.interface";
import { Password } from "../User/Password";

export class ComparePassword {
    constructor(private providersService: ProvidersService) {}
    async isValid(_password: string, salt:string, hash: string):Promise<boolean> {
        const password = new Password(_password);
        return this.providersService.getProvider<ICryptoProvider>(SERVICE_NAMES.CRYPTO_PROVIDER).get().comparePassword(password, salt, hash);
    }
}