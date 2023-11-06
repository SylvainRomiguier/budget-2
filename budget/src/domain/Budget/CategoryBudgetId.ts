import { BudgetId } from "./BudgetId";
import { ValueObject } from "../ValueObject";



export type CategoryBudgetIdDto = {
  budgetId: BudgetId;
  categoryId: string;
};

export class CategoryBudgetId extends ValueObject<CategoryBudgetIdDto> {}