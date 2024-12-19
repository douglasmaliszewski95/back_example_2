import { StateRepository } from '@domain/repositories/state-repository';
import { AbstractStateService } from '@application/services/state/abstract-state.service';
import { StateService } from '@application/services/state/state.service';

export default class StateServiceFactory {
  private static stateServiceFactory: AbstractStateService;

  static async make(stateRepository: StateRepository): Promise<AbstractStateService> {
    if (this.stateServiceFactory) {
      return this.stateServiceFactory;
    }

    this.stateServiceFactory = new StateService(stateRepository);
    return this.stateServiceFactory;
  }
}
