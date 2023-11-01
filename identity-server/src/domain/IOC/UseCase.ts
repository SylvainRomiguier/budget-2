export class UseCase<T> {
    constructor(private _name:string, private useCase:T) {}
    get name () {
        return this._name;
    }
    get () {
        return this.useCase;
    }
}