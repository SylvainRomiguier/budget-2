import { describe, it, expect, jest } from "bun:test";
import { CategoryProviderInMemory } from "../../providers/Category.provider.InMemory";
import { SaveCategory } from "./SaveCategory";
import { Category } from "./Category";
describe("Update Category", () => {
  const categoryProvider = new CategoryProviderInMemory();
  const saveCategory = new SaveCategory(categoryProvider);
  it("should save a category", async () => {
    const category = new Category({
      id: {
         userId: "user-id",
         categoryId: "category-1"
      },
      name : "Some name to be changed"
    })
    const updatedCategory = new Category({
      id: { ...category.value.id.value },
      name: "Vehicle taxes",
    });
    categoryProvider.saveCategory = jest.fn();
    await saveCategory.from(updatedCategory);
    expect(categoryProvider.saveCategory).toHaveBeenCalled();
  });
});
