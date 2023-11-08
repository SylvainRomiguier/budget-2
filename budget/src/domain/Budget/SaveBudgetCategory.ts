import { IBudgetProvider } from "../interfaces";
import { BudgetCategory } from "./BudgetCategory";

export class SaveBudgetCategory {
    constructor(private budgetProvider: IBudgetProvider) { }
    async from(budgetCategory: BudgetCategory) {
        await this.budgetProvider.saveBudgetCategory(budgetCategory);
    }
}