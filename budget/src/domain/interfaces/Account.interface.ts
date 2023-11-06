import { User } from "../User/User";
import { Account } from "../Account/Account";

export interface IAccountProvider {
    saveAccount: (account: Account) => Promise<void>;
    getAccountsByUser: (user: User) => Promise<Account[]>;
}