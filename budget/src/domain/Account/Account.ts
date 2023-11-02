import {  AccountIdDto } from "./AccountId";
import { Transaction } from "../Transaction/Transaction";
import { AccountShort } from "./AccountShort";

export type AccountDto = {
  id: AccountIdDto;
  name: string;
};
export class Account extends AccountShort {
  private _transactions: Transaction[] = [];
  
  static FromAccountShort(accountShort: AccountShort) {
    return new Account({
      id: {
        ...accountShort.value.id.value
      },
      name: accountShort.value.name.value
    });
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      transactions: this._transactions,
    };
  }

  equal(account:Account) {
    return this.id.equal(account.value.id)
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
