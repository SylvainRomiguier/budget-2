import { AccountId } from "../Account/AccountId";
import { ValueObject } from "../ValueObject";

export type PayeeIdDto = {
  accountId: AccountId;
  payeeId: string;
};

export class PayeeId extends ValueObject<PayeeIdDto> {}
