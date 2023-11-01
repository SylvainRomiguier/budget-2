import { IAccountProvider } from "../IOC/interfaces";
import { User } from "../User/User";
import { Account, AccountDto } from "./Account";
import { AccountShort } from "./AccountShort";

export class AddAccount {
  constructor(private accountProvider: IAccountProvider) {}
  async toUser(user: User, { id, name }: AccountDto) {
    const account = new Account({
      id,
      name,
    });
    await this.accountProvider.saveAccount(account);
    user.addAccount(
      new AccountShort({
        id,
        name,
      })
    );
  }
}
