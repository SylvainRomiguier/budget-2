import { Name } from "../Name";
import { PayeeId, PayeeIdDto } from "./PayeeId";

export type PayeeDto = {
  id: PayeeIdDto;
  name: string;
};
export class Payee {
  private _id: PayeeId;
  private _name: Name;
  constructor(payeeDto: PayeeDto) {
    this._id = new PayeeId(payeeDto.id);
    this._name = new Name(payeeDto.name);
  }

  get value() {
    return {
      id: this._id,
      name: this._name,
    };
  }

  equal(payee: Payee) {
    return payee._id.equal(this._id);
  }
}
