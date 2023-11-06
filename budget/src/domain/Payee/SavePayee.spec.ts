import { describe, it, expect, jest } from "bun:test";
import { PayeeProviderInMemory } from "../../providers/Payee.provider.InMemory";
import { SavePayee } from "./SavePayee";
import { Name } from "../Name";
import { Payee } from "./Payee";
import { AccountId } from "../Account/AccountId";
describe("Save Payee", () => {
  const payeeProvider = new PayeeProviderInMemory();
  const savePayee = new SavePayee(payeeProvider);
  it("should savee a payee", async () => {
    const payee = new Payee({
      id: {
        accountId: new AccountId({
          userId: "user-id",
          accountId: "account-1"
        }),
        payeeId: "my-payee-1"
      },
      name: "Morris Garage"
    })
    payee.value.name = new Name("Amazon Web Services");
    payeeProvider.savePayee = jest.fn();
    await savePayee.from(payee);
    expect(payeeProvider.savePayee).toHaveBeenCalled();
  });
});
