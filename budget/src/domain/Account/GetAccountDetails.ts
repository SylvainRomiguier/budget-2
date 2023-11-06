import {
  IPayeeProvider,
  ITransactionProvider,
} from "../interfaces";
import { Account } from "./Account";
import { AccountDetails } from "./AccountDetails";

export class GetAccountDetails {
  constructor(
    private transactionProvider: ITransactionProvider,
    private payeeProvider: IPayeeProvider
  ) {}
  async from(account: Account) {
    const accountDetails = new AccountDetails(account);
    
    const transactions =
      await this.transactionProvider.getTransactionsByAccount(account);
    transactions.forEach(accountDetails.addTransaction);

    const payees = await this.payeeProvider.getPayeesByAccount(account);
    payees.forEach(accountDetails.addPayee);
    return accountDetails;
  }
}
