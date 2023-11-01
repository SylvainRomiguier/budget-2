import { IUserProvider } from "../IOC/interfaces";
import { User } from "./User";


export class SaveUser {
    constructor(private userProvider:IUserProvider){}
    async persist(user:User) {
        await this.userProvider.saveUser(user);
    }
}