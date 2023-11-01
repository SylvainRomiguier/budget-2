import { Elysia } from "elysia";
import { isAuthenticated } from "../auth/auth";
import { getPage } from "./getPage";
export const pages = (app: Elysia) =>
  app.group(
    "/pages",
    (app) =>
      app
        .get("/login", async () => {
          return getPage("/login");
        })
        .get("/signup", async () => {
          return getPage("/signup");
        })
        .use(isAuthenticated)
        .get("/me", async () => {
          return getPage("/me");
        })
    // protected routes
  );
