import { IAccountProvider } from "../interfaces";
import { Account } from "./Account";

export class SaveAccount {
  constructor(private accountProvider: IAccountProvider) {}
  async from(account: Account) {
    await this.accountProvider.saveAccount(account);
  }
}
