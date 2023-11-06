import { describe, it, expect, jest } from "bun:test";
import { TransactionProviderInMemory } from "../../providers/Transaction.provider.InMemory";
import { SaveTransaction } from "./SaveTransaction";
import { Transaction } from "./Transaction";
import { AccountId } from "../Account/AccountId";
import { Category } from "../Category/Category";
import { Payee } from "../Payee/Payee";
import { TransactionId } from "./TransactionId";
import { Account } from "../Account/Account";
describe("Save Transction", () => {
  const transactionProvider = new TransactionProviderInMemory();
  const saveTransaction = new SaveTransaction(transactionProvider);
  it("should update a transaction from an account", async () => {
    const userId = "my-user-id";
    const category = new Category({
      id: {
        userId,
        categoryId: "my-category-1",
      },
      name: "Vehicle expenses",
    });
    const account = new Account({
      id: {
        userId,
        accountId: "my-account-1",
      },
      name: "Bank Account",
    });
    const payee = new Payee({
      id: {
        accountId: account.id,
        payeeId: "payee-1",
      },
      name: "Morris Garage Shop",
    });

    const transaction = new Transaction({
      id: new TransactionId({
        accountId: new AccountId({
          userId: "user-id",
          accountId: "account-id",
        }),
        transactionId: "transaction-id",
      }),
      categoryId: category.value.id,
      amount: 2502.34,
      date: "2023-11-02T15:34:02",
      description: "computer spare parts",
      type: "Outflow",
      payeeId: payee.value.id,
    });
    transactionProvider.saveTransaction = jest.fn();
    await saveTransaction.from(transaction);
    expect(transactionProvider.saveTransaction).toHaveBeenCalled();
  });
});
