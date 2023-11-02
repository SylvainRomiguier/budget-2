export class ValueObject<T> {
    private _value:T;
    constructor(value: T) {
        this._value = value;
    }
    get value() {
        return this._value;
    }

    equal(valueObject: ValueObject<T>) {
        return JSON.stringify(valueObject._value) === JSON.stringify(this._value);
    }
}