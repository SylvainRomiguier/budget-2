export class Provider<T> {
    constructor(private _name:string, private provider:T) {}
    get name () {
        return this._name;
    }
    get () {
        return this.provider;
    }
}