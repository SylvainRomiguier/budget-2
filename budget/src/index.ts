import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { UserProviderInMemory } from "./providers/User.provider.InMemory";
import { AccountProviderInMemory } from "./providers/Account.provider.inMemory";
import { CategoryProviderInMemory } from "./providers/Category.provider.InMemory";
import { PayeeProviderInMemory } from "./providers/Payee.provider.InMemory";
import { TransactionProviderInMemory } from "./providers/Transaction.provider.InMemory";
import { CreateUser } from "./domain/User/CreateUser";
import { UUIDService } from "./providers/UUID.service";
import { UpdateUser } from "./domain/User/SaveUser";
import { GetUser } from "./domain/User/GetUser";
import { userRoutes } from "./api/user/routes";

// providers
const userProvider = new UserProviderInMemory();
const accountProvider = new AccountProviderInMemory();
const categoryProvider = new CategoryProviderInMemory();
const payeeProvider = new PayeeProviderInMemory();
const transactionProvider = new TransactionProviderInMemory();

// services
const uuidService = new UUIDService();

// use cases
const createUser = new CreateUser(userProvider, uuidService);
const updateUser = new UpdateUser(userProvider);
const getUser = new GetUser(userProvider, accountProvider, categoryProvider);

const app = new Elysia()
  .group("/api/v1", (app) =>
    app.use(html()).use(userRoutes(createUser, updateUser, getUser))
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
