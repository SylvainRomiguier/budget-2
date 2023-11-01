export class ValueObject<T> {
    protected _value:T;
    constructor(value: T) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
}