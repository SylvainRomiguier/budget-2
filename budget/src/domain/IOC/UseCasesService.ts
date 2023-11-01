import { UseCase } from "./UseCase";

export class UseCasesService {
  static _instance: UseCasesService | null = null;
  private _useCases: UseCase<any>[] = [];
  constructor() {
    if (!UseCasesService._instance) {
      UseCasesService._instance = this;
    }
    return UseCasesService._instance;
  }

  register<T>(useCase:UseCase<T>) {
    if (this._useCases.filter((_useCase) => _useCase.name === useCase.name).length > 0) {
      throw new Error("This name has already been used.");
    }
    this._useCases.push(useCase);
    return this;
  }

  getUseCase<T>(name: string) {
    const useCase = this._useCases.find((_useCase) => _useCase.name === name);
    if (!useCase) {
      throw new Error("This use case is not registered.");
    }
    return useCase as UseCase<T>;
  }
}
