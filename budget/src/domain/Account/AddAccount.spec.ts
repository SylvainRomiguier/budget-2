import { describe, it, expect } from "bun:test";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { AddAccount } from "./AddAccount";
import { UUIDService } from "../../providers/UUID.service";
import { User } from "../User/User";
describe("Add Account", () => {
  const uuidService = new UUIDService();
  const accountProvider = new AccountProviderInMemory();
  const addAccount = new AddAccount(accountProvider, uuidService);
  it("should add an account to a user", async () => {
    const user = new User({
      id: "my-user-id",
      name: "My User",
      email: "user-email@gmail.com",
    });
    await addAccount.toUser(user, "My bank account");
    expect(user.value.accounts).toHaveLength(1);
  });
});
