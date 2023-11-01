import { Email } from "./Email";
import { Username } from "./Username";

export type UserDto = {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  salt: string;
  hash: string;
};

export class User {
  private _id: string;
  private _username: Username;
  private _email: Email;
  private _profileImage: string;
  private _salt:string;
  private _hash: string;
  constructor(userDto: UserDto) {
    this._id = userDto.id;
    this._username = new Username(userDto.username);
    this._email = new Email(userDto.email);
    this._profileImage = userDto.profileImage;
    this._salt = userDto.salt;
    this._hash = userDto.hash;
  }

  get() {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
      profileImage: this._profileImage,
      salt: this._salt,
      hash: this._hash,
    };
  }
}
