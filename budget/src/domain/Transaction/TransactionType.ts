import { ValueObject } from "../ValueObject";

export type TTransactionType = "Inflow" | "Outflow";

export class TransactionType extends ValueObject<TTransactionType> {
    constructor(value: string) {
        if(value !== "Inflow" && value !== "Outflow") {
            throw new Error("Transaction type is invalid : valid values => Inflow/Outflow.")
        }
        super(value);
    }
}