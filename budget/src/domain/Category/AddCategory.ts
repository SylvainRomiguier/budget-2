import { IUUIDService } from "../interfaces";
import { ICategoryProvider } from "../interfaces/Category.interface";
import { User } from "../User/User";
import { Category } from "./Category";

export class AddCategory {
    constructor(private categoryProvider: ICategoryProvider, private uuidService: IUUIDService) {}
    async toUser(user:User, name: string) {
        const category = new Category({
            id: {
                userId: user.value.id,
                categoryId: this.uuidService.getRandomUUID()
            },
            name
        });
        await this.categoryProvider.saveCategory(category);
        user.addCategory(category);
        return category;
    }
}