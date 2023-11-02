import { IAccountProvider } from "../IOC/interfaces";
import { Account } from "./Account";

export class UpdateAccount {
    constructor(private accountProvider: IAccountProvider){}
    async persist(account:Account) {
        await this.accountProvider.saveAccount(account);
    }
}