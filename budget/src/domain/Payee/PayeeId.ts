import { AccountId, AccountIdDto } from "../Account/AccountId";
import { ValueObject } from "../ValueObject";

export type TPayeeId = {
  accountId: AccountId;
  payeeId: string;
};
export type PayeeIdDto = {
  accountId: AccountIdDto;
  payeeId: string;
};

export class PayeeId extends ValueObject<TPayeeId> {
  constructor(payeeIdDto: PayeeIdDto) {
    super({
      accountId: new AccountId(payeeIdDto.accountId),
      payeeId: payeeIdDto.payeeId,
    });
  }
}
