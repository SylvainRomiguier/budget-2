import { ValueObject } from "../ValueObject";

export type AccountIdDto = {
  userId: string;
  accountId: string;
};

export class AccountId extends ValueObject<AccountIdDto> {
  constructor(accountIdDto: AccountIdDto) {
    super({
      userId: accountIdDto.userId,
      accountId: accountIdDto.accountId
    });
  }
}