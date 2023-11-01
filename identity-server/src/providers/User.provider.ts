import { PrismaClient } from "@prisma/client";
import { Username } from "../domain/User/Username";
import { IUserProvider } from "../domain/IOC/interfaces/User.interface";
import { User } from "../domain/User/User";
import { Email } from "../domain/User/Email";

export class UserProvider implements IUserProvider {
  private prisma = new PrismaClient();
  async getUserByUsername(username: Username) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username.value,
      },
      select: {
        id: true,
        username: true,
        email: true,
        profileImage: true,
        salt: true,
        hash: true
      },
    });
    if (!user) {
      return;
    }
    return new User(user);
  }
  async getUserByEmail(email: Email) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.value,
      },
      select: {
        id: true,
        username: true,
        email: true,
        profileImage: true,
        salt: true,
        hash: true
      },
    });
    if (!user) {
      return;
    }
    return new User(user);
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        profileImage: true,
        salt: true,
        hash: true
      },
    });
    if (!user) {
      return;
    }
    return new User(user);
  }

  async createUser(user: User) {
    const newUser = await this.prisma.user.create({
      data: {
        name: '',
        email: user.get().email.value,
        hash: user.get().hash,
        salt: user.get().salt,
        username: user.get().username.value,
        profileImage: user.get().profileImage,
      },
    });

    return new User(newUser);
  }
}
