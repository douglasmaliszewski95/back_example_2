import { SystemActionRepository } from '@domain/repositories/systemAction-repository';
import { AbstractSystemActionService } from '@application/services/systemAction/abstract-systemAction.service';
import { SystemActionService } from '@application/services/systemAction/systemAction.service';

export default class SystemActionServiceFactory {
  private static systemActionServiceFactory: AbstractSystemActionService;

  static async make(systemActionRepository: SystemActionRepository): Promise<AbstractSystemActionService> {
    if (this.systemActionServiceFactory) {
      return this.systemActionServiceFactory;
    }

    this.systemActionServiceFactory = new SystemActionService(systemActionRepository);
    return this.systemActionServiceFactory;
  }
}
