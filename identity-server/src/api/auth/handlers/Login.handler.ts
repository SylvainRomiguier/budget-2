import { ComparePassword } from "../../../domain/Crypto/ComparePassword";
import { SERVICE_NAMES } from "../../../domain/IOC/ServiceNames.constants";
import { UseCasesService } from "../../../domain/IOC/UseCasesService";
import { User } from "../../../domain/User/User";
import { GetUser } from "../../../domain/User/getUser";

export class LoginHandler {
  constructor(private useCasesService: UseCasesService) {
    this.handle = this.handle.bind(this);
  }
  async handle({
    body,
    set,
    jwt,
    setCookie,
  }: {
    body: any;
    set: any;
    jwt: any;
    setCookie: any;
  }) {
    const { username, password } = body;
    try {
      // verify email/username
      const user: User | undefined = await this.useCasesService
        .getUseCase<GetUser>(SERVICE_NAMES.GET_USER)
        .get()
        .getUserByUsername(username);

      if (!user) {
        throw new Error("Invalid credentials.");
      }

      // verify password
      const match = await this.useCasesService
        .getUseCase<ComparePassword>(SERVICE_NAMES.COMPARE_PASSWORD)
        .get()
        .isValid(password, user.get().salt, user.get().hash);

      if (!match) {
        throw new Error("Invalid credentials.");
      }

      // generate access
      const accessToken = await jwt.sign({
        userId: user.get().id,
      });

      setCookie("access_token", accessToken, {
        maxAge: 15 * 60, // 15 minutes
        path: "/",
      });

      return {
        success: true,
        data: null,
        message: "Account login successfully",
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
