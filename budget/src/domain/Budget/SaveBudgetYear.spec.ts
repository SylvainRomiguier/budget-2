import { describe, it, expect, jest } from "bun:test";
import { SaveBudgetYear } from "./SaveBudgetYear";
import { BudgetProviderInMemory } from "../../providers/Budget.provider.inMemory";
import { BudgetYear } from "./BudgetYear";
import { BudgetId } from "./BudgetId";
import { Year } from "./Year";

describe("Save budget year", () => {
  it("should save a budget year", async () => {
    const budgetProvider = new BudgetProviderInMemory();
    budgetProvider.saveBudgetYear = jest.fn();
    const saveBudgetYear = new SaveBudgetYear(budgetProvider);
    await saveBudgetYear.from(
      new BudgetYear({
        budgetId: new BudgetId({ userId: "user-id", budgetId: "budget-id" }),
        year: new Year(2023),
      })
    );
    expect(budgetProvider.saveBudgetYear).toHaveBeenCalled();
  });
});
