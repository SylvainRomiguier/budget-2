import { describe, it, expect } from "bun:test";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { CreateUser } from "../User/CreateUser";
import { AddAccount } from "../Account/AddAccount";
import { GetUser } from "../User/GetUser";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
import { Account } from "../Account/Account";
import { TransactionProviderInMemory } from "../../providers/Transaction.provider.InMemory";
import { AddTransaction } from "./AddTransaction";
import { UpdateTransaction } from "./UpdateTransaction";
import { Transaction } from "./Transaction";
describe("Update Transction", () => {
  const userProvider = new UserProviderInMemory();
  const accountProvider = new AccountProviderInMemory();
  const transactionProvider = new TransactionProviderInMemory();
  const createUser = new CreateUser(userProvider);
  const getUser = new GetUser(
    userProvider,
    accountProvider,
    new CategoryProviderInMemory()
  );
  const addAccount = new AddAccount(accountProvider);
  const addTransaction = new AddTransaction(transactionProvider);
  const updateTransaction = new UpdateTransaction(transactionProvider);
  it("should update a transaction from an account", async () => {
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
    await addTransaction.toAccount(account, {
      id: {
        accountId: { userId: "my-user-id", accountId: "account-1" },
        transactionId: "transaction-1",
      },
      categoryId: {
        userId: "my-user-id",
        categoryId: "category-1",
      },
      amount: 2502.34,
      date: "2023-11-02T15:34:02",
      description: "computer spare parts",
      type: "Outflow",
      payeeId: {
        accountId: { ...account.id.value },
        payeeId: "payee-id-1",
      },
    });

    const updatedTransaction = new Transaction({
      id: {
        accountId: { userId: "my-user-id", accountId: "account-1" },
        transactionId: "transaction-1",
      },
      categoryId: {
        userId: "my-user-id",
        categoryId: "category-1",
      },
      amount: 2500.0,
      date: "2023-11-02T15:34:02",
      description: "vehicle spare parts",
      type: "Outflow",
      payeeId: {
        accountId: { ...account.id.value },
        payeeId: "payee-id-2",
      },
    });
    await updateTransaction.fromAccount(account, updatedTransaction);
    expect(account.value.transactions).toHaveLength(1);
    expect(account.value.transactions[0].value.description).toBe(
      "vehicle spare parts"
    );
    expect(account.value.transactions[0].value.amount).toBe(2500);
  });
});
