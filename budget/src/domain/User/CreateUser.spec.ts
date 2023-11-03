import { describe, it, expect } from "bun:test";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { CreateUser } from "./CreateUser";
describe("CreateUser", () => {
  it("should create a user", async () => {
    const userProvider = new UserProviderInMemory();
    const createUser = new CreateUser(userProvider);
    expect(createUser.add({
      id: "my-user-id",
      name: "Sylvain Romiguier",
      email: "some-email@gmail.com",
    })).resolves.toBeUndefined();
  });
});
