import { IAccountProvider, IUUIDService } from "../interfaces";
import { User } from "../User/User";
import { Account } from "./Account";

export class AddAccount {
  constructor(
    private accountProvider: IAccountProvider,
    private uuidService: IUUIDService
  ) {}
  async toUser(user: User, name: string) {
    const newId = this.uuidService.getRandomUUID();
    const account = new Account({
      id: {
        userId: user.value.id,
        accountId: newId,
      },
      name,
    });
    await this.accountProvider.saveAccount(account);
    user.addAccount(account);
    return account;
  }
}
