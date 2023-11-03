import { describe, it, expect } from "bun:test";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { AccountProviderInMemory } from "../../providers/Account.provider.inMemory";
import { CreateUser } from "../User/CreateUser";
import { AddCategory } from "./AddCategory";
import { GetUser } from "../User/GetUser";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
import { UpdateCategory } from "./UpdateCategory";
import { Category } from "./Category";
describe("Update Category", () => {
    const userProvider = new UserProviderInMemory();
    const accountProvider = new AccountProviderInMemory();
    const categoryProvider = new CategoryProviderInMemory();
    const createUser = new CreateUser(userProvider);
    const getUser = new GetUser(userProvider, accountProvider, categoryProvider);
    const addCategory = new AddCategory(categoryProvider);
    const updateCategory = new UpdateCategory(categoryProvider);
 it("should update a category from a user", async () => {
    await createUser.add({
        id: "my-user-id",
        name: "Sylvain Romiguier",
        email: "some-email@gmail.com",
      });

    const user = await getUser.fromId("my-user-id");
    await addCategory.toUser(user, {id: {userId: "my-user-id", categoryId: "cat-1"}, name: "Vehicle expenses"});
    const updatedCategory = new Category({id: {userId: "my-user-id", categoryId: "cat-1"}, name: "Vehicle taxes"});
    await updateCategory.fromUser(user, updatedCategory);
    expect(user.value.categories).toHaveLength(1);
    expect(user.value.categories[0].value.name.value).toBe("Vehicle taxes");
 })
})