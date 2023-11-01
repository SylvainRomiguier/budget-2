import { Elysia } from "elysia";
import { useCasesService } from "../..";
import { SERVICE_NAMES } from "../../domain/IOC/ServiceNames.constants";
import { GetUser } from "../../domain/User/getUser";
import { userToJSON } from "../presenters/user.json.presenter";
import { getPage } from "../pages/getPage";

export const isAuthenticated = (app: Elysia) =>
  app.derive(async ({ cookie, jwt, set }) => {
    try {
      if (!cookie.access_token) {
        throw new Error("Unauthorized");
      }
      const { userId } = await jwt.verify(cookie.access_token);
      if (!userId) {
        throw new Error("Invalid Credentials.");
      }
      const user = await useCasesService
        .getUseCase<GetUser>(SERVICE_NAMES.GET_USER)
        .get()
        .getUserById(userId);
      if (!user) {
        throw new Error("User Not found.");
      }
      return {
        response: {
          user: userToJSON(user),
        } 
      };
    } catch (error) {
      return {
        response: {
        page: await getPage('/login')
        }
      }
    }
  });
