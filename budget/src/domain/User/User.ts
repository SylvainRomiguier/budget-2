import { AccountId } from "../Account/AccountId";
import { Account } from "../Account/Account";
import { Budget } from "../Budget/Budget";
import { Category } from "../Category/Category";
import { Email } from "../Email";
import { Name } from "../Name";

export type UserDto = {
  id: string;
  name: any;
  email: any;
};

export class User {
  private _id: string;
  private _name: Name;
  private _email: Email;
  private _accounts: Account[] = [];
  private _categories: Category[] = [];
  private _budgets: Budget[] = [];
  constructor(userDto: UserDto) {
    this._id = userDto.id;
    this._name = new Name(userDto.name);
    this._email = new Email(userDto.email);
  }

  get value() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      accounts: this._accounts,
      categories: this._categories,
      budgets: this._budgets
    };
  }

  equal(user:User) {
    return this._id === user._id;
  }

  addAccount(account: Account) {
    this.removeAccount(account);
    this._accounts.push(account);
  }

  removeAccount(account: Account) {
    this._accounts = this._accounts.filter((_account) => !_account.equal(account));
  }

  getAccountById(id: AccountId) {
    return this._accounts.find(account => account.id.equal(id));
  }

  addCategory(category: Category) {
    this.removeCategory(category);
    this._categories.push(category);
  }

  removeCategory(category: Category) {
    this._categories = this._categories.filter((_category) => !_category.equal(category));
  }

  addBudget(budget: Budget) {
    this.removeBudget(budget);
    this._budgets.push(budget);
  }

  removeBudget(budget: Budget) {
    this._budgets = this._budgets.filter((_budget) => !_budget.equal(budget));
  }
}
