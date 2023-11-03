import {  AccountIdDto } from "./AccountId";
import { Transaction } from "../Transaction/Transaction";
import { AccountShort } from "./AccountShort";
import { Payee } from "../Payee/Payee";

export type AccountDto = {
  id: AccountIdDto;
  name: string;
};
export class Account extends AccountShort {
  private _transactions: Transaction[] = [];
  private _payees: Payee[] = [];
  
  static FromAccountShort(accountShort: AccountShort) {
    return new Account({
      id: {
        ...accountShort.value.id.value
      },
      name: accountShort.value.name.value,
    });
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      transactions: this._transactions,
      payees: this._payees
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

  addPayee(payee: Payee) {
    this.removePayee(payee);
    this._payees.push(payee);
  }

  removePayee(payee: Payee) {
    this._payees = this._payees.filter(
      (_payee) => !_payee.equal(payee)
    );
  }
}
