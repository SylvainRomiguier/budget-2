import {
  IAccountProvider,
  IUserProvider,
  ICategoryProvider,
} from "../interfaces";

export class GetUser {
  constructor(
    private userProvider: IUserProvider,
    private accountProvider: IAccountProvider,
    private categoryProvider: ICategoryProvider
  ) {}
  async fromId(id: string) {
    const user = await this.userProvider.getUser(id);
    if (!user) {
      throw new Error("User not found.");
    }
    const userAccounts = await this.accountProvider.getAccountsByUser(
      user
    );
    userAccounts.forEach(user.addAccount);
    const userCategories = await this.categoryProvider.getCategoriesByUser(
      user
    );
    userCategories.forEach(user.addCategory);
    return user;
  }
}
