import { describe, it, expect } from "bun:test";
import { TransactionProviderInMemory } from "../../providers/Transaction.provider.InMemory";
import { AddTransaction } from "./AddTransaction";
import { UUIDService } from "../../providers/UUID.service";
import { Category } from "../Category/Category";
import { Account } from "../Account/Account";
import { Payee } from "../Payee/Payee";
import { AccountDetails } from "../Account/AccountDetails";
describe("Add Transction", () => {
  const uuidService= new UUIDService();
    const transactionProvider = new TransactionProviderInMemory();
    const addTransaction = new AddTransaction(transactionProvider, uuidService);
 it("should add a transaction to account details", async () => {
      const userId = "my-user-id";
      const category = new Category({
        id: {
          userId,
          categoryId: "my-category-1"
        },
        name: "Vehicle expenses"
      })
    const account = new Account({
      id: {
        userId,
        accountId: "my-account-1"
      },
      name: "Bank Account"
    });
    const payee = new Payee({
      id: {
        accountId: account.id,
        payeeId: "payee-1"
      },
      name: "Morris Garage Shop"
    });

    const accountDetails = new AccountDetails(account);

    await addTransaction.toAccount(accountDetails,{
    categoryId: category.value.id,
    amount: 2502.34,
    date: "2023-11-02T15:34:02",
    description: "computer spare parts",
    type: "Outflow",
    payeeId: payee.value.id
  });
    expect(accountDetails.value.transactions).toHaveLength(1);
 })
})