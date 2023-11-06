import { AccountDetails } from "../Account/AccountDetails";
import { IUUIDService } from "../interfaces";
import { IPayeeProvider } from "../interfaces/Payee.interface";
import { Payee } from "./Payee";

export class AddPayee {
    constructor(private payeeProvider:IPayeeProvider, private uuidService: IUUIDService){}
    async toAccount(accountDetails: AccountDetails, name: string) {
        const payee = new Payee({
            id: {
                accountId: accountDetails.value.account.id,
                payeeId: this.uuidService.getRandomUUID()
            },
            name
        });
        this.payeeProvider.savePayee(payee);
        accountDetails.addPayee(payee);
        return payee;
    }
}