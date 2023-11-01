import { CategoryId, CategoryIdDto } from "./CategoryId";
import { Name } from "../Name";

export type CategoryDto = {
  id: CategoryIdDto;
  name: string;
};
export class Category {
  private _id: CategoryId;
  private _name: Name;
  constructor(categoryDto: CategoryDto) {
    this._id = new CategoryId({
      userId: categoryDto.id.userId,
      categoryId: categoryDto.id.categoryId,
    });
    this._name = new Name(categoryDto.name);
  }

  get value() {
    return {
      id: this._id,
      name: this._name,
    };
  }

  equal(category:Category) {
    return category._id.equal(this._id);
  }
}
