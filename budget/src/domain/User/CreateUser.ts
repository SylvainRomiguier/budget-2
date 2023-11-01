import { IUserProvider } from "../IOC/interfaces";
import { User, UserDto } from "./User";


export class CreateUser {
    constructor(private userProvider:IUserProvider){}
    async add(userDto: UserDto) {
        const user = new User(userDto);
        await this.userProvider.saveUser(user);
    }
}