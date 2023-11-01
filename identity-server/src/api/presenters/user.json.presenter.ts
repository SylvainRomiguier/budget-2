import { User } from "../../domain/User/User";

export const userToJSON = (user: User) => ({
  id: user.get().id,
  username: user.get().username.value,
  email: user.get().email.value,
  profileImage: user.get().profileImage,
});
