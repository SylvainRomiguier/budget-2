import { Budget } from "../domain/Budget/Budget";
import { BudgetId } from "../domain/Budget/BudgetId";
import { User } from "../domain/User/User";
import { IBudgetProvider } from "../domain/interfaces";

export class BudgetProviderInMemory implements IBudgetProvider {
    private _budgets: Budget[] = [];
    async getBudgetsByUser(user: User) {
        return this._budgets.filter(budget => budget.id.value.userId === user.value.id);
    }
    async getBudget(id: BudgetId) {
        return this._budgets.find(budget => budget.id.equal(id));
    }
    async saveBudget(budget: Budget) {
        this._budgets = this._budgets.filter(_budget => !_budget.equal(budget));
        this._budgets.push(budget);
    }
    
}