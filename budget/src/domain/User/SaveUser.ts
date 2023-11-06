import { IUserProvider } from "../interfaces";
import { User } from "./User";


export class SaveUser {
    constructor(private userProvider:IUserProvider){}
    async from(user:User) {
        await this.userProvider.saveUser(user);
    }
}