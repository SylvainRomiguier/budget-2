import { BudgetMonthId, BudgetMonthIdDto } from "./BudgetMonthId";
import { BudgetCategory, BudgetCategoryDto } from "./BudgetCategory";

export type BudgetMonthDto = {
  budgetMonthId: BudgetMonthIdDto;
  categoryBudgets: BudgetCategoryDto[];
};
export class BudgetMonth {
  private _id: BudgetMonthId;
  private _categoryBudgets: BudgetCategory[] = [];
  constructor(budgetMonthDto: BudgetMonthDto) {
    this._id = new BudgetMonthId(budgetMonthDto.budgetMonthId);
    this._categoryBudgets = budgetMonthDto.categoryBudgets.map(
      (cb) => new BudgetCategory(cb)
    );
  }

  get value() {
    return {
      id: this._id,
      categoryBudgets: this._categoryBudgets,
    };
  }

  addBudgetCategory(categoryBudget: BudgetCategory) {
    this.removeBudgetCategory(categoryBudget);
    this._categoryBudgets.push(categoryBudget);
  }

  removeBudgetCategory(categoryBudget: BudgetCategory) {
    this._categoryBudgets = this._categoryBudgets.filter(
      (cb) => !cb.equal(categoryBudget)
    );
  }

  equal(budgetMonth: BudgetMonth) {
    return this._id.equal(budgetMonth._id);
  }
}