export class Handler<T> {
    constructor(private _name:string, private handler:T) {}
    get name () {
        return this._name;
    }
    get () {
        return this.handler;
    }
}