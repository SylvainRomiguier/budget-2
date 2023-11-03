import { User } from "../User/User";
import { Account } from "../Account/Account";
import { AccountId } from "../Account/AccountId";
import { AccountShort } from "../Account/AccountShort";

export interface IAccountProvider {
    getAccount: (id: AccountId) => Promise<Account | undefined>;
    saveAccount: (account: Account) => Promise<void>;
    getAccountsShortByUser: (user: User) => Promise<AccountShort[]>;
}