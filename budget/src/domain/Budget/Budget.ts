import {  BudgetShort } from "./BudgetShort";
import { BudgetYear } from "./BudgetYear";

export class Budget extends BudgetShort {
  private _budgetYears: BudgetYear[] = [];

  get value() {
    return {
      id: this.id,
      name: this.name,
      budgetYears: this._budgetYears,
    };
  }

  addYear(budgetYear: BudgetYear) {
    this.removeYear(budgetYear);
    this._budgetYears.push(budgetYear);
  }

  removeYear(budgetYear: BudgetYear) {
    this._budgetYears = this._budgetYears.filter(
      (by) => !by.equal(budgetYear)
    );
  }
}
