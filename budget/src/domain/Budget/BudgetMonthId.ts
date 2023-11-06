import { ValueObject } from "../ValueObject";
import { BudgetYearId } from "./BudgetYearId";
import { Month } from "./Month";


export type BudgetMonthIdDto = {
  budgetYearId: BudgetYearId;
  budgetMonthId: Month;
};

export class BudgetMonthId extends ValueObject<BudgetMonthIdDto> {}
