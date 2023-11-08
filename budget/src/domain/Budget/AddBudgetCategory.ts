import { CategoryId } from "../Category/CategoryId";
import { IBudgetProvider } from "../interfaces";
import { BudgetCategory } from "./BudgetCategory";
import { BudgetCategoryId } from "./BudgetCategoryId";
import { BudgetMonth } from "./BudgetMonth";

export type CreatedBudgetCategoryDto = {
  categoryId: CategoryId;
  amount: number;
};

export class AddBudgetCategory {
  constructor(private budgetProvider: IBudgetProvider) {}
  async toBudgetMonth(
    budgetMonth: BudgetMonth,
    budgetCategoryDto: CreatedBudgetCategoryDto
  ) {
    const budgetCategory = new BudgetCategory({
      id: new BudgetCategoryId({
        budgetMonthId: budgetMonth.value.id,
        categoryId: budgetCategoryDto.categoryId,
      }),
      amount: budgetCategoryDto.amount,
    });
    await this.budgetProvider.saveBudgetCategory(budgetCategory);
    budgetMonth.addBudgetCategory(budgetCategory);
  }
}
