import { describe, it, expect, jest } from "bun:test";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { SaveUser } from "./SaveUser";
import { User } from "./User";

describe("Save User", () => {
  const userProvider = new UserProviderInMemory();
  const saveUser = new SaveUser(userProvider);
  it("should save a user", async () => {
    const user = new User({
      id: "my-other-id",
      name: "Changed name",
      email: "changed-email@gmail.com",
    });
    userProvider.saveUser = jest.fn();
    await saveUser.from(user);
    expect(userProvider.saveUser).toHaveBeenCalled();
  });
});
