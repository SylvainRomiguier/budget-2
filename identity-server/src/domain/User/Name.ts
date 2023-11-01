import { ValueObject } from "../ValueObject";

export class Name extends ValueObject<string> {
    constructor(name: unknown) {
        if(typeof name !== 'string') {
            throw new Error('Name should be a string.');
        }
        super(name);
        const validation = /^[a-zA-Z-]{5,25}/;
       
        if(!validation.test(name)) {
            throw new Error('Name should be at least 5 letters long, at most 26 letters long.');
        }
        this._value = name;
    }
}