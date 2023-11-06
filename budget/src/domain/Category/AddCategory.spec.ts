import { describe, it, expect } from "bun:test";;
import { AddCategory } from "./AddCategory";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
import { UUIDService } from "../../providers/UUID.service";
import { User } from "../User/User";
describe("Add Category", () => {
   const uuidService = new UUIDService();
    const categoryProvider = new CategoryProviderInMemory();
    const addCategory = new AddCategory(categoryProvider, uuidService);
 it("should add a category to a user", async () => {
   const user = new User({
      id: "my-user-id",
      name: "My User",
      email: "user-email@gmail.com",
    });

    const category = await addCategory.toUser(user,  "Vehicle expenses");
    expect(user.value.categories).toHaveLength(1);
    expect(category).toBeDefined();
 })
})