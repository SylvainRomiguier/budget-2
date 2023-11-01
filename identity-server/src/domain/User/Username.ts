import { ValueObject } from "../ValueObject";

export class Username extends ValueObject<string>{
    constructor(userName: unknown) {
        if(typeof userName !== 'string') {
            throw new Error('User name should be a string.');
        }
        super(userName);
        const validation = /^[a-zA-Z]\w{4,10}/;
        if(!validation.test(userName)) {
            throw new Error('User name should begin with a letter, at least 5 characters long, at most 10 characters long.');
        }
        this._value = userName;
    }
}