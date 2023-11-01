import { Elysia, t } from "elysia";
import { isAuthenticated } from "./auth";
import { handlersService } from "../../index";
import { SignupHandler } from "./handlers/Signup.handler";
import { SERVICE_NAMES } from "../../domain/IOC/ServiceNames.constants";
import { LoginHandler } from "./handlers/Login.handler";
import { html } from "@elysiajs/html";
import { getPage } from "../pages/getPage";
import { pages } from "../pages";
export const auth = (app: Elysia) =>
  app.group("/auth", (app) =>
    app
    .use(html())
      .post(
        "/signup",
        handlersService
          .getHandler<SignupHandler>(SERVICE_NAMES.SIGNUP_HANDLER)
          .get().handle,
        {
          body: t.Object({
            email: t.String(),
            password: t.String(),
            username: t.String(),
          }),
        }
      )
      .post(
        "/login",
        handlersService
          .getHandler<LoginHandler>(SERVICE_NAMES.LOGIN_HANDLER)
          .get().handle,
        {
          body: t.Object({
            password: t.String(),
            username: t.String(),
          }),
        }
      )
      .use(isAuthenticated)
      // protected route
      .get("/me", ({ response }) => {
        if(response?.page) {
          return response.page;
        }
        return {
          success: true,
          message: "Fetch authenticated user details",
          data: {
            user: response.user
          },
        };
      })
  );
