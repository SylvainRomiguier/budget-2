import { describe, it, expect, jest } from "bun:test";
import { SaveAccount } from "./SaveAccount";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { Account } from "./Account";

describe("Save Account", () => {
  const accountProvider = new AccountProviderInMemory();
  const saveAccount = new SaveAccount(accountProvider);
  it("should save an updated account an account", async () => {
    const account = new Account({
      id: {
        userId: "my-user-id",
        accountId: "account-1"
      },
      name: "bank account"
    })
    account.setName("New Account Name");
    accountProvider.saveAccount = jest.fn();
    await saveAccount.from(account);
    expect(accountProvider.saveAccount).toHaveBeenCalled();
  });
});
