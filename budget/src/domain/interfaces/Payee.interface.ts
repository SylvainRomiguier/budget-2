import { Account } from "../Account/AccountDetails";
import { Payee } from "../Payee/Payee";
import { PayeeId } from "../Payee/PayeeId";

export interface IPayeeProvider {
    getPayee: (id: PayeeId) => Promise<Payee | undefined>;
    savePayee: (payee: Payee) => Promise<void>;
    getPayeesByAccount: (account: Account) => Promise<Payee[]>;
}