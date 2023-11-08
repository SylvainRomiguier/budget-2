import { IBudgetProvider } from "../interfaces";
import { BudgetMonth } from "./BudgetMonth";

export class SaveBudgetMonth {
  constructor(private budgetProvider: IBudgetProvider) {}
  async from(budgetMonth: BudgetMonth) {
    await this.budgetProvider.saveBudgetMonth(budgetMonth);
  }
}
