import { Budget } from "../Budget/Budget";
import { BudgetCategory } from "../Budget/BudgetCategory";
import { BudgetId } from "../Budget/BudgetId";
import { BudgetMonth } from "../Budget/BudgetMonth";
import { BudgetYear } from "../Budget/BudgetYear";
import { User } from "../User/User";

export interface IBudgetProvider {
    getBudgetsByUser: (user: User) => Promise<Budget[]>;
    getBudget: (id: BudgetId) => Promise<Budget | undefined>;
    saveBudget: (budget: Budget) => Promise<void>;
    saveBudgetYear: (budgetYear: BudgetYear) => Promise<void>;
    saveBudgetMonth: (budgetMonth: BudgetMonth) => Promise<void>;
    saveBudgetCategory: (budgetCategory: BudgetCategory) => Promise<void>;
}