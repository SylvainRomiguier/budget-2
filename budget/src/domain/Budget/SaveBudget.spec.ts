import { describe, it, expect, jest } from "bun:test";
import { SaveBudget } from "./SaveBudget";
import { BudgetProviderInMemory } from "../../providers/Budget.provider.inMemory";
import { Budget } from "./Budget";

describe("Save Budget", () => {
  it("should save a budget", async () => {
    const budgetProvider = new BudgetProviderInMemory();
    const saveBudget = new SaveBudget(budgetProvider);

    const budget = new Budget({
      id: {
        userId: "my-user-id",
        budgetId: "my-budget-id",
      },
      name: "My Updated Budget",
    });

    budgetProvider.saveBudget = jest.fn();
    await saveBudget.from(budget);

    expect(budgetProvider.saveBudget).toHaveBeenCalled();
  });
});
