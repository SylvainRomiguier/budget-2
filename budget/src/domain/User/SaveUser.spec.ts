import { describe, it, expect } from "bun:test";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { SaveUser } from "./SaveUser";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { CreateUser } from "./CreateUser";
import { GetUser } from "./GetUser";
import { User } from "./User";
import { Email } from "../Email";
import { Name } from "../Name";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";

describe("SaveUser", () => {
  const userProvider = new UserProviderInMemory();
  const createUser = new CreateUser(userProvider);
  const getUser = new GetUser(userProvider, new AccountProviderInMemory(), new CategoryProviderInMemory());
  const saveUser = new SaveUser(userProvider);
  it("should update the name and email of an existing user, save the user and get the user with the new name and email", async () => {
    await createUser.add({
      id: "my-other-id",
      name: "An other",
      email: "other@gmail.com",
    });
    const updatedUser = new User({
      id: "my-other-id",
      name: "Changed name",
      email: "changed-email@gmail.com",
    });
    await saveUser.persist(updatedUser);
    const persistedUser = await getUser.fromId("my-other-id");
    expect(persistedUser.value).toEqual({
      id: "my-other-id",
      name: new Name("Changed name"),
      email: new Email("changed-email@gmail.com"),
      accounts: [],
      categories: []
    });
  });
});
