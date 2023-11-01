import { AccountId, AccountIdDto } from "./AccountId";
import { Name } from "../Name";

export type AccountShortDto = {
  id: AccountIdDto;
  name: string;
};
export class AccountShort {
  private _id: AccountId;
  private _name: Name;
  constructor(accountShortDto: AccountShortDto) {
    this._id = new AccountId({
      userId: accountShortDto.id.userId,
      accountId: accountShortDto.id.accountId,
    });
    this._name = new Name(accountShortDto.name);
  }
  get value() {
    return {
      id: this._id,
      name: this._name,
    };
  }

  equal(accountShort: AccountShort) {
    return accountShort._id.equal(this._id);
  }
}
