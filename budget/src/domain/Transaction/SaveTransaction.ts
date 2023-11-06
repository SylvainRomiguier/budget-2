import { ITransactionProvider } from "../interfaces";
import { Transaction } from "./Transaction";

export class SaveTransaction {
    constructor(private transactionProvider:ITransactionProvider){}
    async from(transaction:Transaction) {
        await this.transactionProvider.saveTransaction(transaction);
    }
}