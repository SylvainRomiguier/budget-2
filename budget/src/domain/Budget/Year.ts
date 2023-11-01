import { ValueObject } from "../ValueObject";

export class Year extends ValueObject<number> {
  constructor(value: any) {
    if (typeof value !== "number" && value < 2000 && value > 2500) {
      throw new Error("Invalid year value.");
    }
    super(value);
  }
}
