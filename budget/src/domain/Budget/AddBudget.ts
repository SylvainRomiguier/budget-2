import { User } from "../User/User";
import { IBudgetProvider, IUUIDService } from "../interfaces";
import { Budget } from "./Budget";

export class AddBudget {
    constructor(private budgetProvider: IBudgetProvider, private uuidService: IUUIDService) {}
    async toUser(user: User, name:string) {
        const budget = new Budget({
            id: {
                userId: user.value.id,
                budgetId: this.uuidService.getRandomUUID()
            },
            name
        });
        await this.budgetProvider.saveBudget(budget);
       return budget;
    }
}