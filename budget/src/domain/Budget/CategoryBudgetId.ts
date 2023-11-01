import { BudgetId, BudgetIdDto } from "./BudgetId";
import { ValueObject } from "../ValueObject";

export type TCategoryBudgetId = {
    budgetId: BudgetId,
    categoryId: string
}

export type CategoryBudgetIdDto = {
  budgetId: BudgetIdDto;
  categoryId: string;
};

export class CategoryBudgetId extends ValueObject<TCategoryBudgetId> {
  constructor(categoryBudgetIdDto: CategoryBudgetIdDto) {
    super({
      budgetId: new BudgetId(categoryBudgetIdDto.budgetId),
      categoryId: categoryBudgetIdDto.categoryId
    });
  }
}