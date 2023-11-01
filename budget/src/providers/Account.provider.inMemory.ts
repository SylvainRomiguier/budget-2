import { Account } from "../domain/Account/Account";
import { AccountId } from "../domain/Account/AccountId";
import { AccountShort } from "../domain/Account/AccountShort";
import { IAccountProvider } from "../domain/IOC/interfaces/Account.interface";
import { User } from "../domain/User/User";

export class AccountProviderInMemory implements IAccountProvider {
  private _accounts: Account[] = [];
  async getAccount(id: AccountId) {
    return this._accounts.find((account) => account.value.id.equal(id));
  }
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
  async getAccountsShortByUser(user: User) {
    const userAccounts = this._accounts.filter(
      (account) => account.value.id.value.userId === user.value.id
    );
    return userAccounts.map(
      (account) =>
        new AccountShort({
          id: {
            accountId: account.value.id.value.accountId,
            userId: account.value.id.value.userId,
          },
          name: account.value.name.value,
        })
    );
  }
}
