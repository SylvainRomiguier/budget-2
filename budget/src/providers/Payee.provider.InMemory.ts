import { Account } from "../domain/Account/Account";
import { IPayeeProvider } from "../domain/IOC/interfaces/Payee.interface";
import { Payee } from "../domain/Payee/Payee";
import { PayeeId } from "../domain/Payee/PayeeId";

export class PayeeProviderInMemory implements IPayeeProvider {
    private _payees: Payee[] = [];
    async getPayee(id: PayeeId) {
        return this._payees.find((payee) => payee.value.id.equal(id));
    }
    async savePayee(payee: Payee) {
        this._payees = this._payees.filter(_payee => !_payee.equal(payee));
        this._payees.push(payee);
    }
    async getPayeesByAccount(account: Account) {
        return this._payees.filter(payee => payee.value.id.value.accountId.equal(account.value.id));
    }
    
}