import { AbstractSystemActionService } from '@application/services/systemAction/abstract-systemAction.service';
import SystemActionServiceFactory from '../services/systemAction.service.factory';
import SystemActionController from '@application/v1/controllers/systemAction/systemAction.controller';
import { SystemActionPrismaRepository } from '@infra/repositories/systemAction-prisma-repository';
import PrismaFactory from '../prisma.factory';

export default class SystemActionControllerFactory {
  private static systemActionControllerFactory: SystemActionController;
  static async make(systemActionService?: AbstractSystemActionService): Promise<SystemActionController> {
    if (this.systemActionControllerFactory) {
      return this.systemActionControllerFactory;
    }

    const systemActionRepository = new SystemActionPrismaRepository(PrismaFactory.make());

    this.systemActionControllerFactory = new SystemActionController(
      systemActionService || (await SystemActionServiceFactory.make(systemActionRepository)),
    );
    return this.systemActionControllerFactory;
  }
}
