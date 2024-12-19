import { AbstractPositionService } from '@application/services/position/abstract-position.service';
import PositionServiceFactory from '../services/position.service.factory';
import PositionController from '@application/v1/controllers/position/position.controller';
import { PositionPrismaRepository } from '@infra/repositories/position-prisma-repository';
import PrismaFactory from '../prisma.factory';

export default class PositionControllerFactory {
  private static positionControllerFactory: PositionController;
  static async make(positionService?: AbstractPositionService): Promise<PositionController> {
    if (this.positionControllerFactory) {
      return this.positionControllerFactory;
    }

    const positionRepository = new PositionPrismaRepository(PrismaFactory.make());

    this.positionControllerFactory = new PositionController(
      positionService || (await PositionServiceFactory.make(positionRepository)),
    );
    return this.positionControllerFactory;
  }
}
