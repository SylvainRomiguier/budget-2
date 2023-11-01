import { BudgetId, BudgetIdDto } from "./BudgetId";
import { CategoryBudget, CategoryBudgetDto } from "./CategoryBudget";

export type BudgetDto = {
  budgetId: BudgetIdDto;
  categoryBudgets: CategoryBudgetDto[];
};
export class Budget {
  private _id: BudgetId;
  private _categoryBudgets: CategoryBudget[] = [];
  constructor(budgetDto: BudgetDto) {
    this._id = new BudgetId(budgetDto.budgetId);
    this._categoryBudgets = budgetDto.categoryBudgets.map(
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
}
