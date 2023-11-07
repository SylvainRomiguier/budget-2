import { BudgetMonthId, BudgetMonthIdDto } from "./BudgetMonthId";
import { CategoryBudget, CategoryBudgetDto } from "./BudgetCategory";

export type BudgetMonthDto = {
  budgetMonthId: BudgetMonthIdDto;
  categoryBudgets: CategoryBudgetDto[];
};
export class BudgetMonth {
  private _id: BudgetMonthId;
  private _categoryBudgets: CategoryBudget[] = [];
  constructor(budgetMonthDto: BudgetMonthDto) {
    this._id = new BudgetMonthId(budgetMonthDto.budgetMonthId);
    this._categoryBudgets = budgetMonthDto.categoryBudgets.map(
      (cb) => new CategoryBudget(cb)
    );
  }

  get value() {
    return {
      id: this._id,
      categoryBudgets: this._categoryBudgets,
    };
  }

  addCategoryBudget(categoryBudget: CategoryBudget) {
    this.removeCategoryBudget(categoryBudget);
    this._categoryBudgets.push(categoryBudget);
  }

  removeCategoryBudget(categoryBudget: CategoryBudget) {
    this._categoryBudgets = this._categoryBudgets.filter(
      (cb) => !cb.equal(categoryBudget)
    );
  }

  equal(budgetMonth: BudgetMonth) {
    return this._id.equal(budgetMonth._id);
  }
}