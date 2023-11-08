import { ValueObject } from "../ValueObject";
import { CategoryId } from "../Category/CategoryId";
import { BudgetMonthId } from "./BudgetMonthId";



export type BudgetCategoryIdDto = {
  budgetMonthId: BudgetMonthId;
  categoryId: CategoryId;
};

export class BudgetCategoryId extends ValueObject<BudgetCategoryIdDto> {}