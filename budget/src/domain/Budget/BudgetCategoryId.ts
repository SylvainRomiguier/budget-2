import { BudgetId } from "./BudgetId";
import { ValueObject } from "../ValueObject";



export type BudgetCategoryIdDto = {
  budgetId: BudgetId;
  categoryId: string;
};

export class BudgetCategoryId extends ValueObject<BudgetCategoryIdDto> {}