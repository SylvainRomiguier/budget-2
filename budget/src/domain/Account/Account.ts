import { AccountId, AccountIdDto } from "./AccountId";
import { Name } from "../Name";
import { Transaction } from "../Transaction/Transaction";

export type AccountDto = {
  id: AccountIdDto;
  name: string;
};
export class Account {
  private _id: AccountId;
  private _name: Name;
  private _transactions: Transaction[] = [];
  constructor(accountDto: AccountDto) {
    this._id = new AccountId({
      userId: accountDto.id.userId,
      accountId: accountDto.id.accountId,
    });
    this._name = new Name(accountDto.name);
  }
  get value() {
    return {
      id: this._id,
      name: this._name,
      transactions: this._transactions,
    };
  }

  equal(account:Account) {
    return this._id.equal(account.value.id)
  }

  addTransaction(transaction: Transaction) {
    this.removeTransaction(transaction);
    this._transactions.push(transaction);
  }

  removeTransaction(transaction: Transaction) {
    this._transactions = this._transactions.filter(
      (_transaction) => !_transaction.equal(transaction)
    );
  }
}
