import { CategoryId } from "../Category/CategoryId";
import { PayeeId } from "../Payee/PayeeId";
import { TransactionId } from "./TransactionId";
import { TransactionType } from "./TransactionType";

export type TransactionDto = {
  id: TransactionId,
  date: string;
  type: string;
  payeeId: PayeeId;
  description: string;
  categoryId: CategoryId;
  amount: number;
};

export class Transaction {
  private _id: TransactionId;
  private _date: Date;
  private _type: TransactionType;
  private _payeeId: PayeeId;
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
    this._id = id;
    this._date = new Date(date);
    this._type = new TransactionType(type);
    this._payeeId = payeeId;
    this._categoryId = categoryId;
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

  isInflow() {
    return this._type.value === "Inflow";
  }

  equal(transaction:Transaction) {
    return transaction._id.equal(this._id);
  }
}
