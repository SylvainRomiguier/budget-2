import { CategoryId, CategoryIdDto } from "../Category/CategoryId";
import { TransactionId, TransactionIdDto } from "./TransactionId";
import { TransactionType } from "./TransactionType";

export type TransactionDto = {
  id: TransactionIdDto,
  date: string;
  type: string;
  payeeId: string;
  description: string;
  categoryId: CategoryIdDto;
  amount: number;
};

export class Transaction {
  private _id: TransactionId;
  private _date: Date;
  private _type: TransactionType;
  private _payeeId: string;
  private _description: string;
  private _categoryId: CategoryId;
  private _amount: number;
  constructor({
    id,
    date,
    type,
    payeeId,
    description,
    categoryId,
    amount,
  }: TransactionDto) {
    this._id = new TransactionId(id);
    this._date = new Date(date);
    this._type = new TransactionType(type);
    this._payeeId = payeeId;
    this._categoryId = new CategoryId(categoryId);
    this._description = description;
    this._amount = amount;
  }

  get value() {
    return {
      id: this._id,
      date: this._date,
      type: this._type,
      payeeId: this._payeeId,
      description: this._description,
      categoryId: this._categoryId,
      amount: this._amount,
    };
  }

  equal(transaction:Transaction) {
    return transaction._id.equal(this._id);
  }
}
