import { IUserProvider } from "../interfaces";
import { User } from "./User";


export class UpdateUser {
    constructor(private userProvider:IUserProvider){}
    async persist(user:User) {
        await this.userProvider.saveUser(user);
    }
}