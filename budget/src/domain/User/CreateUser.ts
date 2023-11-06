import { IUUIDService, IUserProvider } from "../interfaces";
import { User } from "./User";

export type CreateUserDto = {
    name: string;
    email: string;
}
export class CreateUser {
    constructor(private userProvider:IUserProvider, private uuidService: IUUIDService){}
    async add(userDto: CreateUserDto) {
        const newId = this.uuidService.getRandomUUID();
        const user = new User({...userDto, id: newId});
        await this.userProvider.saveUser(user);
        return user;
    }
}