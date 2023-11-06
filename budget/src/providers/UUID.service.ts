import { IUUIDService } from "../domain/interfaces";

export class UUIDService implements IUUIDService {
    getRandomUUID() {
        return crypto.randomUUID();
    }
}