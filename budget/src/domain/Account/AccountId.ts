import { ValueObject } from "../ValueObject";

export type AccountIdDto = {
  userId: string;
  accountId: string;
};

export class AccountId extends ValueObject<AccountIdDto> {}