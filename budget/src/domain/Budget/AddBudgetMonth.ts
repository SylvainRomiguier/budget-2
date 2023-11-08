import { IBudgetProvider } from "../interfaces";
import { BudgetMonth } from "./BudgetMonth";
import { BudgetYear } from "./BudgetYear";
import { Month } from "./Month";

export class AddBudgetMonth {
  constructor(private budgetProvider: IBudgetProvider) {}
  async toBudgetYear(budgetYear: BudgetYear, month: Month) {
    const budgetMonth = new BudgetMonth({
      budgetMonthId: { budgetYearId: budgetYear.value.id, month },
      categoryBudgets: [],
    });
    await this.budgetProvider.saveBudgetMonth(budgetMonth);
    budgetYear.addBudgetMonth(budgetMonth);
  }
}
