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

  addYear(budgetYear: BudgetYear) {
    this.removeYear(budgetYear);
    this._budgetYears.push(budgetYear);
  }

  removeYear(budgetYear: BudgetYear) {
    this._budgetYears = this._budgetYears.filter((by) => !by.equal(budgetYear));
  }
}
