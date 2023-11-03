import { Budget } from "../Budget/Budget";
import { BudgetId } from "../Budget/BudgetId";
import { User } from "../User/User";

export interface IBudgetProvider {
    getBudgetsByUser: (user: User) => Promise<Budget[]>;
    getBudget: (id: BudgetId) => Promise<Budget | undefined>;
    saveBudget: (budget: Budget) => Promise<void>;
}