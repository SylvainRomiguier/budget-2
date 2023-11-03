import { PrismaClient } from "@prisma/client";
import { IUserProvider } from "../domain/interfaces/User.interface";
import { User } from "../domain/User/User";

export class UserProvider implements IUserProvider {
  constructor(private prisma: PrismaClient) {}
  async getUser(id: string) {
    const userDto = await this.prisma.user.findUnique({
      where: {
        id,
      }
    });
    return new User({
      id,
      name: userDto?.name,
      email: userDto?.email,
    });
  }
  async saveUser(user: User) {
    await this.prisma.user.upsert({
      where: {
        id: user.value.id,
      },
      update: {
        name: user.value.name.value,
        email: user.value.email.value,
      },
      create: {
        id: user.value.id,
        name: user.value.name.value,
        email: user.value.email.value,
      },
    });
  }
}
