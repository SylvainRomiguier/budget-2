import { describe, it, expect } from "bun:test";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { CreateUser } from "../User/CreateUser";
import { AddCategory } from "./AddCategory";
import { GetUser } from "../User/GetUser";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
describe("AddCategory", () => {
    const userProvider = new UserProviderInMemory();
    const accountProvider = new AccountProviderInMemory();
    const categoryProvider = new CategoryProviderInMemory();
    const createUser = new CreateUser(userProvider);
    const getUser = new GetUser(userProvider, accountProvider, categoryProvider);
    const addCategory = new AddCategory(categoryProvider);
 it("should add a category to a user", async () => {
    await createUser.add({
        id: "my-user-id",
        name: "Sylvain Romiguier",
        email: "some-email@gmail.com",
      });

    const user = await getUser.fromId("my-user-id");
    await addCategory.toUser(user, {id: {userId: "my-user-id", categoryId: "cat-1"}, name: "Vehicle expenses"});
    expect(user.value.categories).toHaveLength(1);
 })
})