import { describe, it, expect } from "bun:test";
import { AddPayee } from "./AddPayee";
import { PayeeProviderInMemory } from "../../providers/Payee.provider.InMemory";
import { UUIDService } from "../../providers/UUID.service";
import { GetAccountDetails } from "../Account/GetAccountDetails";
import { TransactionProviderInMemory } from "../../providers/Transaction.provider.InMemory";
import { Account } from "../Account/Account";
describe("Add Payee", () => {
  const uuidService = new UUIDService();
  const transactionProvider = new TransactionProviderInMemory();
  const payeeProvider = new PayeeProviderInMemory();
  const getAccountDetails = new GetAccountDetails(
    transactionProvider,
    payeeProvider
  );
  const addPayee = new AddPayee(payeeProvider, uuidService);
  it("should add a payee to account details", async () => {
    const account = new Account({
      id: {
        userId: "my-user-id",
        accountId: "account-1",
      },
      name: "bank account",
    });
    const accountDetails = await getAccountDetails.from(account);
    const payee = await addPayee.toAccount(accountDetails, "Amazon Shop");
    expect(accountDetails.value.payees).toHaveLength(1);
    expect(payee).toBeDefined();
  });
});
