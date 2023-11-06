import { IBudgetProvider } from "../interfaces";
import { Budget} from "./Budget";

export class SaveBudget {
    constructor(private budgetProvider: IBudgetProvider) {}
    async from(budget: Budget) {
        await this.budgetProvider.saveBudget(budget);
    }
}