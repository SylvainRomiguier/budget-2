import { Name } from "./Name";

export type PayeeDto = {
    id: string;
    name: string;
}
export class Payee {
    private _id: string;
    private _name: Name;
    constructor(payeeDto: PayeeDto) {
        this._id = payeeDto.id;
        this._name = new Name(payeeDto.name);
    }

    get value() {
        return {
            id: this._id,
            name: this._name
        }
    }
}