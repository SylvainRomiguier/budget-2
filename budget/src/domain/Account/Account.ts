import { AccountId, AccountIdDto } from "./AccountId";
import { Name } from "../Name";

export type AccountDto = {
  id: AccountIdDto;
  name: string;
};
export class Account {
  private _id: AccountId;
  private _name: Name;
  constructor(accountDto: AccountDto) {
    this._id = new AccountId({
      userId: accountDto.id.userId,
      accountId: accountDto.id.accountId,
    });
    this._name = new Name(accountDto.name);
  }
  get value() {
    return {
      id: this._id,
      name: this._name,
    };
  }

  setName(newValue: string) {
    this._name = new Name(newValue);
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
