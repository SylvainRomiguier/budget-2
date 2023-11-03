import { Account } from "../Account/Account";
import { ITransactionProvider } from "../interfaces";
import { Transaction } from "./Transaction";

export class UpdateTransaction {
    constructor(private transactionProvider:ITransactionProvider){}
    async fromAccount(account: Account, transaction:Transaction) {
        await this.transactionProvider.saveTransaction(transaction);
        account.addTransaction(transaction);
    }
}