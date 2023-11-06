import { Account } from "../domain/Account/Account";
import { IAccountProvider } from "../domain/interfaces/Account.interface";
import { User } from "../domain/User/User";

export class AccountProviderInMemory implements IAccountProvider {
  private _accounts: Account[] = [];
  async saveAccount(account: Account) {
    const existingAccount = this._accounts.find((_account) =>
      _account.equal(account)
    );
    if (existingAccount) {
      this._accounts = this._accounts.filter(
        (_account) => !_account.equal(account)
      );
    }
    this._accounts.push(account);
  }
  async getAccountsByUser(user: User) {
    return this._accounts.filter(
      (account) => account.value.id.value.userId === user.value.id
    );
  }
}
