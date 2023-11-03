import { ValueObject } from "../ValueObject";
import { BudgetYearId, BudgetYearIdDto } from "./BudgetYearId";
import { Month } from "./Month";


export type TBudgetMonthId = {
  budgetYearId: BudgetYearId;
  budgetMonthId: Month;
};

export type BudgetMonthIdDto = {
  budgetYearId: BudgetYearIdDto;
  budgetMonthId: number;
};

export class BudgetMonthId extends ValueObject<TBudgetMonthId> {
  constructor(budgetMonthIdDto: BudgetMonthIdDto) {
    super({
      budgetYearId: new BudgetYearId(budgetMonthIdDto.budgetYearId),
      budgetMonthId: new Month(budgetMonthIdDto.budgetMonthId)
    });
  }
}
