import { AbstractStateService } from '@application/services/state/abstract-state.service';
import StateServiceFactory from '../services/state.service.factory';
import StateController from '@application/v1/controllers/state/state.controller';
import { StatePrismaRepository } from '@infra/repositories/state-prisma-repository';
import PrismaFactory from '../prisma.factory';

export default class StateControllerFactory {
  private static stateControllerFactory: StateController;
  static async make(stateService?: AbstractStateService): Promise<StateController> {
    if (this.stateControllerFactory) {
      return this.stateControllerFactory;
    }

    const stateRepository = new StatePrismaRepository(PrismaFactory.make());

    this.stateControllerFactory = new StateController(
      stateService || (await StateServiceFactory.make(stateRepository)),
    );
    return this.stateControllerFactory;
  }
}
