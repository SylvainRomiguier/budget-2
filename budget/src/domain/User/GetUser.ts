import {
  IAccountProvider,
  IUserProvider,
  ICategoryProvider,
  ITransactionProvider,
  IBudgetProvider,
} from "../interfaces";

export class GetUser {
  constructor(
    private userProvider: IUserProvider,
    private accountProvider: IAccountProvider,
    private transactionProvider: ITransactionProvider,
    private categoryProvider: ICategoryProvider,
    private budgetProvider: IBudgetProvider
  ) {}
  async fromId(id: string) {
    const user = await this.userProvider.getUser(id);
    if (!user) {
      throw new Error("User not found.");
    }
    const userAccounts = await this.accountProvider.getAccountsByUser(user);
    for (const account of userAccounts) {
      account.setBalance(await this.transactionProvider.getBalanceForAccount(
        account
      ));
      user.addAccount(account);
    }
    for (const category of await this.categoryProvider.getCategoriesByUser(
      user
    )) {
      user.addCategory(category);
    }

    for (const budget of await this.budgetProvider.getBudgetsByUser(user)) {
      user.addBudget(budget);
    }

    return user;
  }
}
