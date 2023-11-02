import { describe, it, expect } from "bun:test";
import { UpdateAccount } from "./UpdateAccount";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { AddAccount } from "./AddAccount";
import { GetAccount } from "./GetAccount";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { CreateUser } from "../User/CreateUser";
import { GetUser } from "../User/GetUser";
import { AccountId } from "./AccountId";
import { Name } from "../Name";
import { Account } from "./Account";

describe("Update Account", () => {
  const userProvider = new UserProviderInMemory();
  const accountProvider = new AccountProviderInMemory();
  const createUser = new CreateUser(userProvider);
  const getUser = new GetUser(
    userProvider,
    accountProvider,
    new CategoryProviderInMemory()
  );
  const addAccount = new AddAccount(accountProvider);
  const getAccount = new GetAccount(accountProvider);
  const updateAccount = new UpdateAccount(accountProvider);
  it("should update and persist an account", async () => {
    await createUser.add({
      id: "my-user-id",
      name: "Sylvain Romiguier",
      email: "some-email@gmail.com",
    });

    const user = await getUser.fromId("my-user-id");
    await addAccount.toUser(user, {
      id: { userId: "my-user-id", accountId: "account-1" },
      name: "My bank account",
    });

    const accountShort = user.value.accounts.find((a) =>
      a.value.id.equal(
        new AccountId({ userId: "my-user-id", accountId: "account-1" })
      )
    );

    accountShort!.setName("New Account Name");
    const account = Account.FromAccountShort(accountShort!);
    await updateAccount.persist(account);
    const persistedAccount = await getAccount.fromId(
      new AccountId({ userId: "my-user-id", accountId: "account-1" })
    );
    expect(persistedAccount?.value.name.value).toBe("New Account Name");
  });
});
