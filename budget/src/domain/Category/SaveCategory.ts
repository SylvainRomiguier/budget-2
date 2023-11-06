import { ICategoryProvider } from "../interfaces";
import { Category } from "./Category";

export class SaveCategory {
  constructor(private categoryProvider: ICategoryProvider) {}
  async from(category: Category) {
    await this.categoryProvider.saveCategory(category);
  }
}
