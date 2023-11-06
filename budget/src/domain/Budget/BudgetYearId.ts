import { ValueObject } from "../ValueObject";
import { BudgetId } from "./BudgetId";
import { Year } from "./Year";

export type BudgetYearIdDto = {
  budgetId: BudgetId;
  year: Year;
};

export class BudgetYearId extends ValueObject<BudgetYearIdDto> {}
