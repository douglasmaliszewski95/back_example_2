import { AbstractFunctionalityService } from '@application/services/functionality/abstract-functionality.service';
import FunctionalityServiceFactory from '../services/functionality.service.factory';
import FunctionalityController from '@application/v1/controllers/functionality/functionality.controller';
import { FunctionalityPrismaRepository } from '@infra/repositories/functionality-prisma-repository';
import PrismaFactory from '../prisma.factory';

export default class FunctionalityControllerFactory {
  private static functionalityControllerFactory: FunctionalityController;
  static async make(functionalityService?: AbstractFunctionalityService): Promise<FunctionalityController> {
    if (this.functionalityControllerFactory) {
      return this.functionalityControllerFactory;
    }

    const functionalityRepository = new FunctionalityPrismaRepository(PrismaFactory.make());

    this.functionalityControllerFactory = new FunctionalityController(
      functionalityService || (await FunctionalityServiceFactory.make(functionalityRepository)),
    );
    return this.functionalityControllerFactory;
  }
}
