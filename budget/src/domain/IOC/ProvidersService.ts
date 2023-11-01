import { Provider } from "./Provider";

export class ProvidersService {
  static _instance: ProvidersService | null = null;
  private _providers: Provider<any>[] = [];
  constructor() {
    if (!ProvidersService._instance) {
      ProvidersService._instance = this;
    }
    return ProvidersService._instance;
  }

  register<T>(provider: Provider<T>) {
    if (this._providers.filter((_service) => _service.name === provider.name).length > 0) {
      throw new Error("This name has already been used.");
    }
    this._providers.push(provider);
    return this;
  }

  getProvider<T>(name: string) {
    const provider = this._providers.find((_provider) => _provider.name === name);
    if (!provider) {
      throw new Error("This use case is not registered.");
    }
    return provider as Provider<T>;
  }
}
