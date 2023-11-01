import { Email } from "../../User/Email";
import { User } from "../../User/User";
import { Username } from "../../User/Username";

export interface IUserProvider {
  getUserByUsername: (username: Username) => Promise<User | undefined>;
  getUserByEmail: (email: Email) => Promise<User | undefined>;
  getUserById: (id: string) => Promise<User | undefined>;
  createUser: (user: User) => Promise<User>;
}
