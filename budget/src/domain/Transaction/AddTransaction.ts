import { AccountDetails } from "../Account/AccountDetails";
import { CategoryId } from "../Category/CategoryId";
import { PayeeId } from "../Payee/PayeeId";
import { IUUIDService } from "../interfaces";
import { ITransactionProvider } from "../interfaces/Transaction.interface";
import { Transaction } from "./Transaction";
import { TransactionId } from "./TransactionId";

export type CreatedTransactionDto = {
  date: string;
  type: string;
  payeeId: PayeeId;
  description: string;
  categoryId: CategoryId;
  amount: number;
};
export class AddTransaction {
  constructor(private transactionProvider: ITransactionProvider, private uuidService: IUUIDService) {}
  async toAccount(accountDetails: AccountDetails, transactionDto: CreatedTransactionDto) {
    const transaction = new Transaction({
      id: new TransactionId({
        accountId: accountDetails.value.account.id,
        transactionId: this.uuidService.getRandomUUID()
      }),
      ...transactionDto
    });
    await this.transactionProvider.saveTransaction(transaction);
    accountDetails.value.account.increaseBalance(transaction.signedAmount)
    accountDetails.addTransaction(transaction);
    return transaction;
  }
}
