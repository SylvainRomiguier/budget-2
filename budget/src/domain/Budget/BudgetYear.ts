import { BudgetMonth } from "./BudgetMonth";
import { BudgetYearId, BudgetYearIdDto } from "./BudgetYearId";
import { Month } from "./Month";

export class BudgetYear {
  private _id: BudgetYearId;
  private _budgetMonths: BudgetMonth[] = [];
  constructor(budgetYearIdDto: BudgetYearIdDto) {
    this._id = new BudgetYearId(budgetYearIdDto);
  }

  get value() {
    return {
      id: this._id,
      budgetMonths: this._budgetMonths,
    };
  }

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

  getBudgetMonth(_month: number) {
    const month = new Month(_month);
    const budgetMonth = this._budgetMonths.find(bm => bm.value.id.value.month.equal(month));
    return budgetMonth;
  }

  private sort() {
    this._budgetMonths.sort(
      (bm1, bm2) =>
        bm1.value.id.value.month.value -
        bm2.value.id.value.month.value
    );
  }

  equal(budgetYear: BudgetYear) {
    return this._id.equal(budgetYear._id);
  }
}
