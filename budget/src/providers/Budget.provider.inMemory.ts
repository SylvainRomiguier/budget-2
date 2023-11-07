import { Budget } from "../domain/Budget/Budget";
import { BudgetCategory } from "../domain/Budget/BudgetCategory";
import { BudgetId } from "../domain/Budget/BudgetId";
import { BudgetMonth } from "../domain/Budget/BudgetMonth";
import { BudgetYear } from "../domain/Budget/BudgetYear";
import { User } from "../domain/User/User";
import { IBudgetProvider } from "../domain/interfaces";

export class BudgetProviderInMemory implements IBudgetProvider {
    private _budgets: Budget[] = [];
    private _budgetYears: BudgetYear[] = [];
    private _budgetMonths: BudgetMonth[] = [];
    private _budgetCategories: BudgetCategory[] = [];
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
    async saveBudgetYear(budgetYear: BudgetYear) {
        this._budgetYears = this._budgetYears.filter(_budgetYear => !_budgetYear.equal(budgetYear));
        this._budgetYears.push(budgetYear);
    }
    async saveBudgetMonth(budgetMonth: BudgetMonth){
        this._budgetMonths = this._budgetMonths.filter(_budgetMonth => !_budgetMonth.equal(budgetMonth));
        this._budgetMonths.push(budgetMonth);
    }
    async saveBudgetCategory(budgetCategory: BudgetCategory) {
        this._budgetCategories = this._budgetCategories.filter(_budgetCategory => !_budgetCategory.equal(budgetCategory));
        this._budgetCategories.push(budgetCategory);
    }
    
}