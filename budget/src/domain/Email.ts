import { ValueObject } from "./ValueObject";

export class Email extends ValueObject<string> {
    constructor(email: unknown) {
        if(typeof email !== 'string') {
            throw new Error('Email address should be a string.');
        }
        super(email);
        const validation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      
        if(!validation.test(email)) {
            throw new Error('Email address is not valid.');
        }
        this._value = email;
    }
}