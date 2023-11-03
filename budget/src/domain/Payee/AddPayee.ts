import { Account } from "../Account/Account";
import { IPayeeProvider } from "../IOC/interfaces/Payee.interface";
import { Payee, PayeeDto } from "./Payee";

export class AddPayee {
    constructor(private payeeProvider:IPayeeProvider){}
    async toAccount(account: Account, payeeDto: PayeeDto) {
        const payee = new Payee(payeeDto);
        this.payeeProvider.savePayee(payee);
        account.addPayee(payee);
    }
}