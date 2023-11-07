import { Transaction } from "../Transaction/Transaction";
import { Account } from "./Account";
import { Payee } from "../Payee/Payee";


export class AccountDetails {
  private _account: Account;
  private _transactions: Transaction[] = [];
  private _payees: Payee[] = [];

  constructor(account:Account) {
    this._account = account;
  }

  get value() {
    return {
      account: this._account,
      transactions: this._transactions,
      payees: this._payees
    };
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
