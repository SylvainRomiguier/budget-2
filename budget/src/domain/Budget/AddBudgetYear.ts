import { IBudgetProvider } from "../interfaces";
import { BudgetDetails } from "./BudgetDetails";
import { BudgetYear } from "./BudgetYear";
import { Year } from "./Year";

export class AddBudgetYear {
    constructor(private budgetProvider: IBudgetProvider) {}
    async toBudget(budgetDetails: BudgetDetails, year: Year) {
        const budgetYear = new BudgetYear({
            budgetId: budgetDetails.value.budget.id,
            year,
        });
        await this.budgetProvider.saveBudgetYear(budgetYear);
        budgetDetails.addBudgetYear(budgetYear);
    }
}