import { Account } from "../Account/Account";
import { ITransactionProvider } from "../IOC/interfaces/Transaction.interface";
import { Transaction, TransactionDto } from "./Transaction";

export class AddTransaction {
  constructor(private transactionProvider: ITransactionProvider) {}
  async toAccount(account: Account, transactionDto: TransactionDto) {
    const transaction = new Transaction(transactionDto);
    await this.transactionProvider.saveTransaction(transaction);
    account.addTransaction(transaction);
  }
}
