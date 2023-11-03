import { describe, it, expect } from "bun:test";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { CreateUser } from "../User/CreateUser";
import { AddAccount } from "../Account/AddAccount";
import { GetUser } from "../User/GetUser";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
import { Account } from "../Account/Account";
import { AddPayee } from "./AddPayee";
import { PayeeProviderInMemory } from "../../providers/Payee.provider.InMemory";
import { UpdatePayee } from "./UpdatePayee";
import { Payee } from "./Payee";
describe("Update Payee", () => {
  const userProvider = new UserProviderInMemory();
  const accountProvider = new AccountProviderInMemory();
  const payeeProvider = new PayeeProviderInMemory();
  const createUser = new CreateUser(userProvider);
  const getUser = new GetUser(
    userProvider,
    accountProvider,
    new CategoryProviderInMemory()
  );
  const addAccount = new AddAccount(accountProvider);
  const addPayee = new AddPayee(payeeProvider);
  const updatePayee = new UpdatePayee(payeeProvider);
  it("should add a payee to an account", async () => {
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
    const account = Account.FromAccountShort(user.value.accounts[0]);
    await addPayee.toAccount(account, {
      id: {
        accountId: { userId: "my-user-id", accountId: "account-1" },
        payeeId: "payee-id-1",
      },
      name: "Amazon Shop",
    });
    const updatedPayee = new Payee({
      id: {
        accountId: { userId: "my-user-id", accountId: "account-1" },
        payeeId: "payee-id-1",
      },
      name: "Amazon Web Services",
    });
    await updatePayee.fromAccount(account, updatedPayee);
    expect(account.value.payees).toHaveLength(1);
    expect(account.value.payees[0].value.name.value).toBe(
      "Amazon Web Services"
    );
  });
});
