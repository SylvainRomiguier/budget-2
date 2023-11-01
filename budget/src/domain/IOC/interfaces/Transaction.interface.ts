import { Account } from "../../Account/Account";
import { Transaction } from "../../Transaction/Transaction";
import { TransactionId } from "../../Transaction/TransactionId";

export interface ITransactionProvider {
    getTransaction: (accountId: TransactionId) => Promise<Transaction>;
    saveTransaction: (transaction: Transaction) => Promise<void>;
    getTransactionsByAccount: (account: Account) => Promise<Transaction[]>;
}