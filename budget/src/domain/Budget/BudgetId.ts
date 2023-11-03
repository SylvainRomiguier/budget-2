import { ValueObject } from "../ValueObject";

export type TBudgetId = {
  userId: string;
  budgetId: string;
};

export type BudgetIdDto = {
  userId: string;
  budgetId: string;
};

export class BudgetId extends ValueObject<TBudgetId> {
  constructor(budgetIdDto: BudgetIdDto) {
    super({
      userId: budgetIdDto.userId,
      budgetId: budgetIdDto.budgetId,
    });
  }
}
