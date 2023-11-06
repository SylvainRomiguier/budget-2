import { describe, it, expect } from "bun:test";
import { UserProviderInMemory } from "../../providers/User.provider.InMemory";
import { CreateUser } from "./CreateUser";
import { UUIDService } from "../../providers/UUID.service";
describe("CreateUser", () => {
  it("should create a user", async () => {
    const userProvider = new UserProviderInMemory();
    const uuidService = new UUIDService();
    const createUser = new CreateUser(userProvider, uuidService);
    expect(createUser.add({
      name: "Sylvain Romiguier",
      email: "some-email@gmail.com",
    })).resolves.toBeDefined();
  });
});
