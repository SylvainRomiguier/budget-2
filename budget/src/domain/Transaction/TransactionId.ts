import { AccountId } from "../Account/AccountId";
import { ValueObject } from "../ValueObject";


export type TransactionIdDto = {
  accountId: AccountId;
  transactionId: string;
};

export class TransactionId extends ValueObject<TransactionIdDto> {}