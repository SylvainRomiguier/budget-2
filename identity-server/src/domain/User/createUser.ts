import { SERVICE_NAMES } from "../IOC/ServiceNames.constants";
import { User, UserDto } from "./User";
import { ProvidersService } from "../IOC/ProvidersService";
import { IUserProvider } from "../IOC/interfaces/User.interface";

export class CreateUser {
    constructor(private providersService: ProvidersService){}
    async handle(userDto:UserDto) {
        const userToCreate = new User(userDto);
        return this.providersService.getProvider<IUserProvider>(SERVICE_NAMES.USER_PROVIDER).get().createUser(userToCreate);
    }
}