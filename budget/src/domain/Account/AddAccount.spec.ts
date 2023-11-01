import { describe, it, expect } from "bun:test";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { CreateUser } from "../User/CreateUser";
import { AddAccount } from "./AddAccount";
import { GetUser } from "../User/GetUser";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
describe("AddAccount", () => {
    const userProvider = new UserProviderInMemory();
    const accountProvider = new AccountProviderInMemory();
    const createUser = new CreateUser(userProvider);
    const getUser = new GetUser(userProvider, accountProvider, new CategoryProviderInMemory());
    const addAccount = new AddAccount(accountProvider);
 it("should add an account to a user", async () => {
    await createUser.add({
        id: "my-user-id",
        name: "Sylvain Romiguier",
        email: "some-email@gmail.com",
      });

    const user = await getUser.fromId("my-user-id");
    await addAccount.toUser(user, {id: {userId: "my-user-id", accountId: "account-1"}, name: "My bank account"});
    expect(user.value.accounts).toHaveLength(1);
 })
})