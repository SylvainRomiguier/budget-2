import { ValueObject } from "../ValueObject";

export type BudgetIdDto = {
  userId: string;
  budgetId: string;
};

export class BudgetId extends ValueObject<BudgetIdDto> {}
