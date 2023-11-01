import { AccountId, AccountIdDto } from "../Account/AccountId";
import { ValueObject } from "../ValueObject";

export type TTransactionId = {
    accountId: AccountId,
    transactionId: string
}

export type TransactionIdDto = {
  accountId: AccountIdDto;
  transactionId: string;
};

export class TransactionId extends ValueObject<TTransactionId> {
  constructor(transactionIdDto: TransactionIdDto) {
    super({
      accountId: new AccountId(transactionIdDto.accountId),
      transactionId: transactionIdDto.transactionId
    });
  }

  static FromAccountId(transactionId: TTransactionId) {
    return new TransactionId({
        accountId: {
            userId: transactionId.accountId.value.userId,
            accountId: transactionId.accountId.value.accountId,
        },
        transactionId: transactionId.transactionId
    })
  }
}