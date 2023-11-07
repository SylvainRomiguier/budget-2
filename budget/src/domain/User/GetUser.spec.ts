import { describe, it, expect } from "bun:test";
import { GetUser } from "./GetUser";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { CreateUser } from "./CreateUser";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
import { UUIDService } from "../../providers/UUID.service";
import { TransactionProviderInMemory } from "../../providers/Transaction.provider.InMemory";
import { BudgetProviderInMemory } from "../../providers/Budget.provider.inMemory";
import { AddCategory } from "../Category/AddCategory";
import { AddAccount } from "../Account/AddAccount";
import { AddBudget } from "../Budget/AddBudget";
import { AddTransaction } from "../Transaction/AddTransaction";
import { AddPayee } from "../Payee/AddPayee";
import { PayeeProviderInMemory } from "../../providers/Payee.provider.InMemory";
import { AccountDetails } from "../Account/AccountDetails";

describe("Get User", () => {
  const uuidService = new UUIDService();
  const userProvider = new UserProviderInMemory();
  const accountProvider = new AccountProviderInMemory();
  const payeeProvider = new PayeeProviderInMemory();
  const transactionProvider = new TransactionProviderInMemory();
  const categoryProvider=new CategoryProviderInMemory();
  const budgetProvider = new BudgetProviderInMemory();
  const createUser = new CreateUser(userProvider, uuidService);
  const getUser = new GetUser(
    userProvider,
   accountProvider,
   transactionProvider,
   categoryProvider,
   budgetProvider
  );
  const addCategory = new AddCategory(categoryProvider, uuidService);
  const addAccount = new AddAccount(accountProvider, uuidService);
  const addBudget = new AddBudget(budgetProvider, uuidService);
  const addPayee = new AddPayee(payeeProvider, uuidService);
  const addTransaction = new AddTransaction(transactionProvider, uuidService);

  it("should get a user from id", async () => {
    const user = await createUser.add({
      name: "Sylvain Romiguier",
      email: "some-email@gmail.com",
    });
    const foundUser = await getUser.fromId(user.value.id);
    expect(user.equal(foundUser)).toBeTrue();
  });
  it("should throw an error if user is not found from id", () => {
    expect(() => getUser.fromId("unknown-id")).toThrow("User not found.");
  });

  it("should retrieve accounts balances, categories and budgets for a user", async () => {
    const user = await createUser.add({
      name: "Sylvain Romiguier",
      email: "some-email@gmail.com",
    });

    const category = await addCategory.toUser(user, "Vehicle");
    const account = await addAccount.toUser(user, "Bank Account");
    await addBudget.toUser(user, "Personal budget");
    const accountDetails = new AccountDetails(account);
    const payee = await addPayee.toAccount(accountDetails, "Morris Garage");
     await addTransaction.toAccount(accountDetails, {
      categoryId: category.value.id,
      payeeId: payee.value.id,
      type: "Outflow",
      description: "Motor fix",
      date: "2023-11-02T14:24:00",
      amount: 2150.25
    });

     await addTransaction.toAccount(accountDetails, {
      categoryId: category.value.id,
      payeeId: payee.value.id,
      type: "Outflow",
      description: "Discount",
      date: "2023-11-02T14:24:00",
      amount: -150.25
    });

    await addTransaction.toAccount(accountDetails, {
      categoryId: category.value.id,
      payeeId: payee.value.id,
      type: "Inflow",
      description: "Used car sell",
      date: "2023-11-02T14:24:00",
      amount: 5000
    });

    expect(user.value.accounts[0].value.balance).toBe(3000);

    const foundUser = await getUser.fromId(user.value.id);

    expect(foundUser.value.accounts[0].value.balance).toBe(3000);
    expect(foundUser.value.budgets).toHaveLength(1);
    expect(foundUser.value.categories[0].value.name.value).toBe("Vehicle");
  })

});
