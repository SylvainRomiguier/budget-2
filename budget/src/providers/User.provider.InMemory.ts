import { IUserProvider } from "../domain/interfaces/User.interface";
import { User } from "../domain/User/User";

export class UserProviderInMemory implements IUserProvider {
  private _users: User[] = [];
  async getUser(id: string) {
    return this._users.find((_user) => _user.value.id === id);
  }
  async saveUser(user: User) {
    this._users = this._users.filter(_user => !_user.equal(user));
    this._users.push(user);
  }
}
