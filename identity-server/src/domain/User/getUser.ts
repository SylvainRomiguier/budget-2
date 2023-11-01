import { Email } from "./Email";
import { ProvidersService } from "../IOC/ProvidersService";
import { SERVICE_NAMES } from "../IOC/ServiceNames.constants";
import { Username } from "./Username";
import { IUserProvider } from "../IOC/interfaces/User.interface";

export class GetUser {
  constructor(private providersService: ProvidersService) {}
  async getUserByUsername(_username: unknown) {
    return this.providersService
      .getProvider<IUserProvider>(SERVICE_NAMES.USER_PROVIDER)
      .get()
      .getUserByUsername(new Username(_username));
  }
  async getUserByEmail(_email: unknown) {
    return this.providersService
      .getProvider<IUserProvider>(SERVICE_NAMES.USER_PROVIDER)
      .get()
      .getUserByEmail(new Email(_email));
  }
  async getUserById(_id: unknown) {
    return this.providersService
      .getProvider<IUserProvider>(SERVICE_NAMES.USER_PROVIDER)
      .get()
      .getUserById(_id?.toString() ?? "");
  }
}
