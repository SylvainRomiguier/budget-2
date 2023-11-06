import { Budget } from "../domain/Budget/Budget";
import { BudgetId } from "../domain/Budget/BudgetId";
import { User } from "../domain/User/User";
import { IBudgetProvider } from "../domain/interfaces";

export class BudgetProviderInMemory implements IBudgetProvider {
    async getBudgetsByUser(user: User) {
        return [];
    }
    async getBudget(id: BudgetId) {
        return undefined
    }
    async saveBudget(budget: Budget) {
        return undefined
    }
    
}