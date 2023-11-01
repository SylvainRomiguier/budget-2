import { Elysia } from "elysia";
import { auth } from "./api/auth";
import { pages } from "./api/pages";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { ProvidersService } from "./domain/IOC/ProvidersService";
import { UseCasesService } from "./domain/IOC/UseCasesService";
import { IUserProvider } from "./domain/IOC/interfaces/User.interface";
import { UserProvider } from "./providers/User.provider";
import { CryptoProvider } from "./providers/Crypto.provider";
import { ICryptoProvider } from "./domain/IOC/interfaces/Crypto.interface";
import { SERVICE_NAMES } from "./domain/IOC/ServiceNames.constants";
import { CreateUser } from "./domain/User/createUser";
import { GetUser } from "./domain/User/getUser";
import { Provider } from "./domain/IOC/Provider";
import { UseCase } from "./domain/IOC/UseCase";
import { HashPassword } from "./domain/Crypto/HashPassword";
import { ComparePassword } from "./domain/Crypto/ComparePassword";
import { Md5Hash } from "./domain/Crypto/Md5Hash";
import { HandlersService } from "./domain/IOC/HandlersService";
import { SignupHandler } from "./api/auth/handlers/Signup.handler";
import { Handler } from "./domain/IOC/Handler";
import { LoginHandler } from "./api/auth/handlers/Login.handler";
import { html } from "@elysiajs/html";

const providersService = new ProvidersService()
  .register<IUserProvider>(
    new Provider<IUserProvider>(SERVICE_NAMES.USER_PROVIDER, new UserProvider())
  )
  .register<ICryptoProvider>(
    new Provider<ICryptoProvider>(
      SERVICE_NAMES.CRYPTO_PROVIDER,
      new CryptoProvider()
    )
  );

export const useCasesService = new UseCasesService()
  .register<CreateUser>(
    new UseCase<CreateUser>(
      SERVICE_NAMES.CREATE_USER,
      new CreateUser(providersService)
    )
  )
  .register<GetUser>(
    new UseCase<GetUser>(SERVICE_NAMES.GET_USER, new GetUser(providersService))
  )
  .register<HashPassword>(
    new UseCase<HashPassword>(
      SERVICE_NAMES.HASH_PASSWORD,
      new HashPassword(providersService)
    )
  )
  .register<ComparePassword>(
    new UseCase<ComparePassword>(
      SERVICE_NAMES.COMPARE_PASSWORD,
      new ComparePassword(providersService)
    )
  )
  .register<Md5Hash>(
    new UseCase<Md5Hash>(SERVICE_NAMES.MD5_HASH, new Md5Hash(providersService))
  );

export const handlersService = new HandlersService()
  .register<SignupHandler>(
    new Handler(
      SERVICE_NAMES.SIGNUP_HANDLER,
      new SignupHandler(useCasesService)
    )
  )
  .register<LoginHandler>(
    new Handler<LoginHandler>(
      SERVICE_NAMES.LOGIN_HANDLER,
      new LoginHandler(useCasesService)
    )
  );
const app = new Elysia()
  .group("/api", (app) =>
    app
      .use(
        jwt({
          name: "jwt",
          secret: Bun.env.JWT_SECRET!,
        })
      )
      .use(cookie())
      .use(html())
      .use(auth)
      .use(pages)
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
