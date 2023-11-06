import { Elysia, t } from "elysia";
import { CreateUser } from "../../domain/User/CreateUser";
import { GetUser } from "../../domain/User/GetUser";
import { UpdateUser } from "../../domain/User/SaveUser";
import { User } from "../../domain/User/User";

export const userRoutes =
  (createUser: CreateUser, updateUser: UpdateUser, getUser: GetUser) =>
  (app: Elysia) =>
    app.group("/user", (app) =>
      app
        .post(
          "/",
          async ({ body, set }) => {
            try {
              const { name, email } = body;
              const id = await createUser.add({
                name,
                email,
              });
              return {
                success: true,
                data: {
                    id
                },
                message: `User ${name} created.`,
              };
            } catch (error) {
              set.status = 400;
              return {
                success: false,
                data: null,
                message: (error as Error).message,
              };
            }
          },
          {
            body: t.Object({
              email: t.String(),
              name: t.String(),
            }),
          }
        )
        .put(
          "/",
          async ({ body, set }) => {
            try {
              const { id, name, email } = body;
              const updatedUser = new User({
                id,
                name,
                email,
              });
              await updateUser.persist(updatedUser);
              return {
                success: true,
                data: null,
                message: `User ${name} updated.`,
              };
            } catch (error) {
              set.status = 400;
              return {
                success: false,
                data: null,
                message: (error as Error).message,
              };
            }
          },
          {
            body: t.Object({
              id: t.String(),
              email: t.String(),
              name: t.String(),
            }),
          }
        )
        .get(
          "/:id",
          async ({ params: { id }, set }) => {
            try {
              const user = await getUser.fromId(id);
              return {
                success: true,
                // TODO : implement a user presenter
                data: user.value,
                message: `User ${user.value.id} provided.`,
              };
            } catch (error) {
              set.status = 400;
              return {
                success: false,
                data: null,
                message: (error as Error).message,
              };
            }
          },
          {
            params: t.Object({
              id: t.String(),
            }),
          }
        )
    );
