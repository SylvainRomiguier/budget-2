import { describe, it, expect } from "bun:test";
import { BudgetYear } from "./BudgetYear";
import { BudgetId } from "./BudgetId";
import { Year } from "./Year";
import { AddBudgetMonth } from "./AddBudgetMonth";
import { BudgetProviderInMemory } from "../../providers/Budget.provider.inMemory";
import { Month } from "./Month";

describe("Add budget month to a budget year", () => {
  it("should add  new Budget Month to a Budget Year", async () => {
    const budgetProvider = new BudgetProviderInMemory();
    const addBudgetMonth = new AddBudgetMonth(budgetProvider);
    const budgetYear = new BudgetYear({
      budgetId: new BudgetId({
        userId: "my-user-id",
        budgetId: "my-budget-id",
      }),
      year: new Year(2023),
    });
    await addBudgetMonth.toBudgetYear(budgetYear, new Month(1));
    expect(budgetYear.value.budgetMonths[0].value.id.value.month.value).toBe(1);
  });
});
