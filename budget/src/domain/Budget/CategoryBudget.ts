import { CategoryBudgetId, CategoryBudgetIdDto } from "./CategoryBudgetId";

export type CategoryBudgetDto = {
  id: CategoryBudgetIdDto;
  amount: number;
};

export class CategoryBudget {
  private _id: CategoryBudgetId;
  private _amount: number;
  constructor(categoryBudgetDto: CategoryBudgetDto) {
    this._id = new CategoryBudgetId(categoryBudgetDto.id);
    this._amount = categoryBudgetDto.amount;
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

  equal(categoryBudget: CategoryBudget) {
    return this._id.equal(categoryBudget._id);
  }
}
