import { User } from "../User/User";
import { ICategoryProvider } from "../interfaces";
import { Category } from "./Category";

export class UpdateCategory {
  constructor(private categoryProvider: ICategoryProvider) {}
  async fromUser(user: User, category: Category) {
    await this.categoryProvider.saveCategory(category);
    user.addCategory(category);
  }
}
