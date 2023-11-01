import { User } from "../../User/User";

export interface IUserProvider {
    getUser: (id: string) => Promise<User | undefined>;
    saveUser: (user:User) => Promise<void>;
}