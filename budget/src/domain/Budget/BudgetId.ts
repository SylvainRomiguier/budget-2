import { Month } from "./Month";
import { ValueObject } from "../ValueObject";
import { Year } from "./Year";

export type TBudgetId = {
  userId: string;
  year: Year;
  month: Month;
};

export type BudgetIdDto = {
  userId: string;
  year: number;
  month: number;
};

export class BudgetId extends ValueObject<TBudgetId> {
  constructor(budgetIdDto: BudgetIdDto) {
    super({
      userId: budgetIdDto.userId,
      year: new Year(budgetIdDto.year),
      month: new Month(budgetIdDto.month),
    });
  }
}
