import { Handler } from "./Handler";

export class HandlersService {
  static _instance: HandlersService | null = null;
  private _handlers: Handler<any>[] = [];
  constructor() {
    if (!HandlersService._instance) {
      HandlersService._instance = this;
    }
    return HandlersService._instance;
  }

  register<T>(handler: Handler<T>) {
    if (this._handlers.filter((_service) => _service.name === handler.name).length > 0) {
      throw new Error("This name has already been used.");
    }
    this._handlers.push(handler);
    return this;
  }

  getHandler<T>(name: string) {
    const handler = this._handlers.find((_handler) => _handler.name === name);
    if (!handler) {
      throw new Error("This use case is not registered.");
    }
    return handler as Handler<T>;
  }
}
