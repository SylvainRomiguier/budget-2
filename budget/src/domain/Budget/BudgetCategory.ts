import { BudgetCategoryId } from "./BudgetCategoryId";

export type BudgetCategoryDto = {
  id: BudgetCategoryId;
  amount: number;
};

export class BudgetCategory {
  private _id: BudgetCategoryId;
  private _amount: number;
  constructor(budgetCategoryDto: BudgetCategoryDto) {
    this._id = budgetCategoryDto.id;
    this._amount = budgetCategoryDto.amount;
  }

  get value() {
    return {
      id: this._id,
      amount: this._amount,
    };
  }

  set amount(value:number) {
    this._amount = value;
  }

  equal(budgetCategory: BudgetCategory) {
    return this._id.equal(budgetCategory._id);
  }
}
