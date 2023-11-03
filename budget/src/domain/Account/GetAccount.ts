import {
  IAccountProvider,
  IPayeeProvider,
  ITransactionProvider,
} from "../IOC/interfaces";
import { AccountId } from "./AccountId";

export class GetAccount {
  constructor(
    private accountProvider: IAccountProvider,
    private transactionProvider: ITransactionProvider,
    private payeeProvider: IPayeeProvider
  ) {}
  async fromId(id: AccountId) {
    const account = await this.accountProvider.getAccount(id);
    if (!account) {
      throw new Error("Account noty found.");
    }
    const transactions =
      await this.transactionProvider.getTransactionsByAccount(account);
    transactions.forEach(account.addTransaction);
    const payees = await this.payeeProvider.getPayeesByAccount(account);
    payees.forEach(account.addPayee);
    return account;
  }
}
