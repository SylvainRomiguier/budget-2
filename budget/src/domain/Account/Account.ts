import { AccountId, AccountIdDto } from "./AccountId";
import { Name } from "../Name";
import { TransactionId, TransactionIdDto } from "../Transaction/TransactionId";

export type AccountDto = {
  id: AccountIdDto;
  name: string;
};
export class Account {
  private _id: AccountId;
  private _name: Name;
  private _transactionIds: TransactionId[] = [];
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
      transactionsIds: this._transactionIds,
    };
  }

  equal(account:Account) {
    return this._id.equal(account.value.id)
  }

  addTransactionId(transactionId: TransactionId) {
    this.removeTransactionId(transactionId);
    this._transactionIds.push(transactionId);
  }

  removeTransactionId(transactionId: TransactionId) {
    this._transactionIds = this._transactionIds.filter(
      (tId) => !tId.equal(transactionId)
    );
  }
}
