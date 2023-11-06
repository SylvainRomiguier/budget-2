import { IPayeeProvider } from "../interfaces/Payee.interface";
import { Payee } from "./Payee";

export class SavePayee {
  constructor(private payeeProvider: IPayeeProvider) {}
  async from(payee: Payee) {
    this.payeeProvider.savePayee(payee);
  }
}
