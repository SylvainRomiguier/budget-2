import { Account } from "../Account/Account";
import { IPayeeProvider } from "../interfaces/Payee.interface";
import { Payee } from "./Payee";

export class UpdatePayee {
    constructor(private payeeProvider:IPayeeProvider){}
    async fromAccount(account: Account, payee: Payee) {
        this.payeeProvider.savePayee(payee);
        account.addPayee(payee);
    }
}