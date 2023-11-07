import { AccountId, AccountIdDto } from "./AccountId";
import { Name } from "../Name";

export type AccountDto = {
  id: AccountIdDto;
  name: string;
};
export class Account {
  private _id: AccountId;
  private _name: Name;
  private _balance: number;
  constructor(accountDto: AccountDto) {
    this._id = new AccountId({
      userId: accountDto.id.userId,
      accountId: accountDto.id.accountId,
    });
    this._name = new Name(accountDto.name);
    this._balance = 0;
  }
  get value() {
    return {
      id: this._id,
      name: this._name,
      balance: this._balance
    };
  }

  setName(newValue: string) {
    this._name = new Name(newValue);
  }

  increaseBalance(value: number) {
    this._balance += value;
  }

  decreaseBalance(value: number) {
    this._balance -= value;
  }

  setBalance(newValue: number) {
    this._balance = newValue;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  equal(account: Account) {
    return account._id.equal(this._id);
  }
}
