import {describe, it, expect, jest} from "bun:test";
import { SaveBudgetCategory } from "./SaveBudgetCategory";
import { BudgetProviderInMemory } from "../../providers/Budget.provider.inMemory";
import { BudgetCategoryId } from "./BudgetCategoryId";
import { BudgetMonthId } from "./BudgetMonthId";
import { BudgetCategory } from "./BudgetCategory";
import { BudgetId } from "./BudgetId";
import { Year } from "./Year";
import { BudgetYearId } from "./BudgetYearId";
import { Month } from "./Month";
import { CategoryId } from "../Category/CategoryId";

describe("Save budget category", () => {

    describe("Save budget category", () => {
        it("should save a budget category", async () => {
            const budgetProvider = new BudgetProviderInMemory();
            budgetProvider.saveBudgetCategory = jest.fn();
            const saveBudgetCategory = new SaveBudgetCategory(budgetProvider);
            const budgetCategory = new BudgetCategory( {
                id: new BudgetCategoryId({
                    budgetMonthId: new BudgetMonthId({
                        budgetYearId: new BudgetYearId({
                            budgetId: new BudgetId({
                                userId: "user-id",
                                budgetId: "budget-id"
                            }),
                            year: new Year(2023)
                        }),
                        month: new Month(1)
                    }),
                    categoryId: new CategoryId({userId: "user-id", categoryId: "category-id"})
                }),
                amount: 100,
            });
            await saveBudgetCategory.from(budgetCategory);
            expect(budgetProvider.saveBudgetCategory).toHaveBeenCalled();
        });
    });
});
