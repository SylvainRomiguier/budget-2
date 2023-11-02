import { IAccountProvider } from "../IOC/interfaces";
import { AccountId } from "./AccountId";

export class GetAccount {
    constructor(private accountProvider: IAccountProvider) {}
    async fromId(id:AccountId) {
        return this.accountProvider.getAccount(id);
    }
}