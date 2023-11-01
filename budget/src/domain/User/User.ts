import { AccountShort } from "../Account/AccountShort";
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
  private _accounts: AccountShort[] = [];
  private _categories: Category[] = [];
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
      categories: this._categories
    };
  }

  equal(user:User) {
    return this._id === user._id;
  }

  addAccount(account: AccountShort) {
    this.removeAccount(account);
    this._accounts.push(account);
  }

  removeAccount(account: AccountShort) {
    this._accounts = this._accounts.filter((_account) => !_account.equal(account));
  }

  addCategory(category: Category) {
    this.removeCategory(category);
    this._categories.push(category);
  }

  removeCategory(category: Category) {
    this._categories = this._categories.filter((_category) => !_category.equal(category));
  }
}
