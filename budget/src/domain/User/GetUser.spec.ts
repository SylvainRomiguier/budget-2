import { describe, it, expect } from "bun:test";
import { GetUser } from "./GetUser";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { CreateUser } from "./CreateUser";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
import { UUIDService } from "../../providers/UUID.service";
describe("GetUser", () => {
  const uuidService = new UUIDService();
  const userProvider = new UserProviderInMemory();
  const createUser = new CreateUser(userProvider, uuidService);
  const getUser = new GetUser(
    userProvider,
    new AccountProviderInMemory(),
    new CategoryProviderInMemory()
  );
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
});
