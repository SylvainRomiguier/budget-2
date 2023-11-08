import { describe, it, expect } from "bun:test";
import { AddBudgetYear } from "./AddBudgetYear";
import { BudgetProviderInMemory } from "../../providers/Budget.provider.inMemory";
import { Budget } from "./Budget";
import { Year } from "./Year";
import { BudgetDetails } from "./BudgetDetails";

describe("Add budget year", () => {
    it("should add  new Budget Year to a Budget", async () => {
        const budgetProvider = new BudgetProviderInMemory();
        const addBudgetYear = new AddBudgetYear(budgetProvider);

    const budget = new Budget({id: {
        userId: "my-user-id",
        budgetId: "my-budget-id"
    }, name: "test budget"});
    const budgetDetails = new BudgetDetails(budget);
        await addBudgetYear.toBudget(budgetDetails, new Year(2023));
        expect(budgetDetails.value.budgetYears[0].value.id.value.year.value).toBe(2023);
    })
});