import { ICategoryProvider } from "../interfaces/Category.interface";
import { User } from "../User/User";
import { Category, CategoryDto } from "./Category";

export class AddCategory {
    constructor(private categoryProvider: ICategoryProvider) {}
    async toUser(user:User, categoryDto: CategoryDto) {
        const category = new Category(categoryDto);
        await this.categoryProvider.saveCategory(category);
        user.addCategory(category);
    }
}