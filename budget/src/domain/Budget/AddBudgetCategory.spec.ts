import { describe, it, expect } from "bun:test";
import { AddBudgetCategory } from "./AddBudgetCategory";
import { BudgetProviderInMemory } from "../../providers/Budget.provider.inMemory";
import { BudgetMonth } from "./BudgetMonth";
import { Month } from "./Month";
import { BudgetId } from "./BudgetId";
import { Year } from "./Year";
import { BudgetYear } from "./BudgetYear";
import { BudgetYearId } from "./BudgetYearId";
import { Category } from "../Category/Category";

describe("Add budget category", () => {
  it("should add  new Budget Category to a Budget Month", async () => {
    const budgetProvider = new BudgetProviderInMemory();
    const addBudgetCategory = new AddBudgetCategory(budgetProvider);
    const budgetMonth = new BudgetMonth({
      budgetMonthId: {
        budgetYearId: new BudgetYearId({
          budgetId: new BudgetId({
            userId: "my-user-id",
            budgetId: "my-budget-id",
          }),
          year: new Year(2023),
        }),
        month: new Month(1),
      },
      categoryBudgets: [],
    });

    const category = new Category({
      id: {
        userId: "my-user-id",
        categoryId: "my-category-id",
      },
      name: "test category",
    });
    await addBudgetCategory.toBudgetMonth(budgetMonth, {
      categoryId: category.value.id,
      amount: 1000,
    });
    expect(budgetMonth.value.categoryBudgets[0].value.amount).toBe(1000);
  });
});
