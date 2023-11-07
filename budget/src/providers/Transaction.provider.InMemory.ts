import { Account } from "../domain/Account/Account";
import { ITransactionProvider } from "../domain/interfaces/Transaction.interface";
import { Transaction } from "../domain/Transaction/Transaction";
import { TransactionId } from "../domain/Transaction/TransactionId";

export class TransactionProviderInMemory implements ITransactionProvider {
    private _transactions: Transaction[] = [];
    async getTransaction(id: TransactionId) {
        return this._transactions.find((transaction) => transaction.value.id.equal(id));
    }
    async saveTransaction(transaction: Transaction) {
        this._transactions = this._transactions.filter(_transaction => !_transaction.equal(transaction));
        this._transactions.push(transaction);
    }
    async getTransactionsByAccount(account: Account) {
        return this._transactions.filter(transaction => transaction.value.id.value.accountId.equal(account.value.id));
    }
    async getBalanceForAccount(account: Account) {
        const transactions = await this.getTransactionsByAccount(account);
        let balance = 0;
        transactions.forEach(transaction => {
            balance += transaction.signedAmount;
        })
        return balance;
    }
}