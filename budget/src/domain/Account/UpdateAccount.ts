import { User } from "../User/User";
import { IAccountProvider } from "../interfaces";
import { Account } from "./Account";
import { AccountShort } from "./AccountShort";

export class UpdateAccount {
  constructor(private accountProvider: IAccountProvider) {}
  async fromUser(user: User, account: Account) {
    await this.accountProvider.saveAccount(account);
    user.addAccount(
      new AccountShort({
        id: { ...account.id.value },
        name: account.name.value,
      })
    );
  }
}
