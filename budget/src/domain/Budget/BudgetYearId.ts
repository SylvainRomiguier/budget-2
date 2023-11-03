import { ValueObject } from "../ValueObject";
import { BudgetId, BudgetIdDto } from "./BudgetId";
import { Year } from "./Year";

export type TBudgetYearId = {
  budgetId: BudgetId;
  year: Year;
};

export type BudgetYearIdDto = {
  budgetId: BudgetIdDto;
  year: number;
};

export class BudgetYearId extends ValueObject<TBudgetYearId> {
  constructor(budgetYearIdDto: BudgetYearIdDto) {
    super({
      budgetId: new BudgetId(budgetYearIdDto.budgetId),
      year: new Year(budgetYearIdDto.year)
    });
  }
}
