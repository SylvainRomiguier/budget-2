import { BudgetMonth } from "./BudgetMonth";

export class BudgetMonths {
  private _budgetMonths: BudgetMonth[] = [];
  addBudgetMonth(budgetMonth: BudgetMonth) {
    this.removeBudgetMonth(budgetMonth);
    this._budgetMonths.push(budgetMonth);
    this.sort();
  }
  removeBudgetMonth(budgetMonth: BudgetMonth) {
    this._budgetMonths = this._budgetMonths.filter(
      (bm) => !bm.value.id.equal(budgetMonth.value.id)
    );
    this.sort();
  }

  private sort() {
    this._budgetMonths.sort(
      (bm1, bm2) =>
        bm1.value.id.value.budgetMonthId.value -
        bm2.value.id.value.budgetMonthId.value
    );
  }
}
