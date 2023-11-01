import { Category } from "../domain/Category/Category";
import { CategoryId } from "../domain/Category/CategoryId";
import { ICategoryProvider } from "../domain/IOC/interfaces/Category.interface";
import { User } from "../domain/User/User";

export class CategoryProviderInMemory implements ICategoryProvider {
    private _categories: Category[] = [];
    async getCategory(id: CategoryId) {
        return this._categories.find((category) => category.value.id.equal(id));
    }
    async saveCategory(category: Category) {
        this._categories = this._categories.filter(_category => !_category.equal(category));
        this._categories.push(category);
    }
    async getCategoriesByUser(user:User) {
        return this._categories.filter(category => category.value.id.value.userId === user.value.id);
    }
}