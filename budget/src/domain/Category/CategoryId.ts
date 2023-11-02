import { ValueObject } from "../ValueObject";

export type CategoryIdDto = {
  userId: string;
  categoryId: string;
};

export class CategoryId extends ValueObject<CategoryIdDto> {
  constructor(categoryIdDto: CategoryIdDto) {
    super({
      userId: categoryIdDto.userId,
      categoryId: categoryIdDto.categoryId
    });
  }
}