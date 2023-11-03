import { Category } from "../Category/Category";
import { CategoryId } from "../Category/CategoryId";
import { User } from "../User/User";

export interface ICategoryProvider {
    getCategory: (id: CategoryId) => Promise<Category | undefined>;
    saveCategory: (category:Category) => Promise<void>;
    getCategoriesByUser: (user:User) => Promise<Category[]>;
}