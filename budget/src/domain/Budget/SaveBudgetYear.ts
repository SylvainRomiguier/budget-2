import { IBudgetProvider } from "../interfaces";
import { BudgetYear } from "./BudgetYear";

export class SaveBudgetYear {
    constructor(private budgetProvider: IBudgetProvider) {}
    async from(budgetYear: BudgetYear) {
        await this.budgetProvider.saveBudgetYear(budgetYear);
    }
}