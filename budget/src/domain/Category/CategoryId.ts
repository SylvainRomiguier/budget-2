import { ValueObject } from "../ValueObject";

export type CategoryIdDto = {
  userId: string;
  categoryId: string;
};

export class CategoryId extends ValueObject<CategoryIdDto> {}