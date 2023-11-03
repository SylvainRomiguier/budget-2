import { Name } from "../Name";
import { BudgetIdDto, BudgetId } from "./BudgetId";

export type BudgetDto = {
    budgetId: BudgetIdDto;
    name: string;
  };
  export class BudgetShort {
    private _id: BudgetId;
    private _name: Name;
    constructor(budgetDto: BudgetDto) {
      this._id = new BudgetId(budgetDto.budgetId);
      this._name = new Name(budgetDto.name);
    }
  
    get value() {
      return {
        id: this._id,
        name: this._name,
      };
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
}