import { Budget } from "./Budget";
import { BudgetYear } from "./BudgetYear";

export class BudgetDetails {
  private _budget: Budget;
  private _budgetYears: BudgetYear[] = [];

  constructor(budget:Budget) {
    this._budget = budget;
  }

  get value() {
    return {
      budget: this._budget,
      budgetYears: this._budgetYears,
    };
  }

  addBudgetYear(budgetYear: BudgetYear) {
    this.removeBudgetYear(budgetYear);
    this._budgetYears.push(budgetYear);
  }

  removeBudgetYear(budgetYear: BudgetYear) {
    this._budgetYears = this._budgetYears.filter((by) => !by.equal(budgetYear));
  }
}
