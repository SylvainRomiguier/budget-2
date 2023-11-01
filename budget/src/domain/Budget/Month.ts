import { ValueObject } from "../ValueObject";

export class Month extends ValueObject<number> {
  constructor(value: any) {
    if (typeof value !== "number" && value < 1 && value > 12) {
      throw new Error("Invalid month value.");
    }
    super(value);
  }
}
