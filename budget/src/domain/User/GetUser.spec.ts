import { describe, it, expect } from "bun:test";
import { Email } from "../Email";
import { Name } from "../Name";
import { GetUser } from "./GetUser";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { CreateUser } from "./CreateUser";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
describe("GetUser", () => {
  const userProvider = new UserProviderInMemory();
  const createUser = new CreateUser(userProvider);
  const getUser = new GetUser(userProvider, new AccountProviderInMemory(), new CategoryProviderInMemory());
  it("should get a user from id", async () => {
    await createUser.add({
      id: "my-user-id",
      name: "Sylvain Romiguier",
      email: "some-email@gmail.com",
    });
    const user = await getUser.fromId("my-user-id");
    expect(user.value).toEqual({
      id: "my-user-id",
      name: new Name("Sylvain Romiguier"),
      email: new Email("some-email@gmail.com"),
      accounts: [],
      categories: []
    });
  });
  it("should throw an error if user is not found from id", () => {
    expect(() => getUser.fromId("unknown-id")).toThrow("User not found.");
  });
});
