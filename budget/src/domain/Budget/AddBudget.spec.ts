import { describe, it, expect } from "bun:test";
import {AddBudget} from "./AddBudget";
import { UUIDService } from "../../providers/UUID.service";
import { BudgetProviderInMemory } from "../../providers/Budget.provider.inMemory";
import { User } from "../User/User";

describe("Add budget", () => {
    it("should add  new Budget to a user", async () => {
        const uuidService = new UUIDService();
        const budgetProvider = new BudgetProviderInMemory();
        const addBudget = new AddBudget(budgetProvider, uuidService);
        const user = new User({id: uuidService.getRandomUUID(), name: "test user", email: "test@gmail.com"});
        await addBudget.toUser(user, "test budget");
        expect(user.value.budgets[0].name.value).toBe("test budget");
    })
})