import { HashPassword } from "../../../domain/Crypto/HashPassword";
import { Md5Hash } from "../../../domain/Crypto/Md5Hash";
import { UseCasesService } from "../../../domain/IOC/UseCasesService";
import { SERVICE_NAMES } from "../../../domain/IOC/ServiceNames.constants";
import { User } from "../../../domain/User/User";
import { CreateUser } from "../../../domain/User/createUser";
import { GetUser } from "../../../domain/User/getUser";
import { userToJSON } from "../../presenters/user.json.presenter";

export class SignupHandler {
  constructor(private useCasesService: UseCasesService) {
    this.handle = this.handle.bind(this);
  }
  async handle({ body, set }: { body: any; set: any }) {
    const { email, password, username } = body;
    try {
      // validate duplicate email address
      const emailExists = await this.useCasesService
        .getUseCase<GetUser>(SERVICE_NAMES.GET_USER)
        .get()
        .getUserByEmail(email);
      if (emailExists) {
        set.status = 400;
        return {
          success: false,
          data: null,
          message: "Email address already in use.",
        };
      }

      // validate duplicate username
      const usernameExists = await this.useCasesService
        .getUseCase<GetUser>(SERVICE_NAMES.GET_USER)
        .get()
        .getUserByUsername(username);
      if (usernameExists) {
        set.status = 400;
        return {
          success: false,
          data: null,
          message: "Someone already taken this username.",
        };
      }

      // handle password
      const { hash, salt } = await this.useCasesService
        .getUseCase<HashPassword>(SERVICE_NAMES.HASH_PASSWORD)
        .get()
        .getHash(password);
      const emailHash = this.useCasesService
        .getUseCase<Md5Hash>(SERVICE_NAMES.MD5_HASH)
        .get()
        .getMd5Hash(email);
      const profileImage = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

      const newUser: User = await this.useCasesService
        .getUseCase<CreateUser>(SERVICE_NAMES.CREATE_USER)
        .get()
        .handle({
          id: "New",
          email,
          hash,
          profileImage,
          salt,
          username,
        });

      return {
        success: true,
        message: "Account created",
        data: {
          user: userToJSON(newUser),
        },
      };
    } catch (error) {
      set.status = 400;
      return {
        success: false,
        data: null,
        message: (error as Error).message,
      };
    }
  }
}
