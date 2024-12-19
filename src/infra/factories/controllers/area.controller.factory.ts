import { AbstractAreaService } from '@application/services/area/abstract-area.service';
import AreaServiceFactory from '../services/area.service.factory';
import AreaController from '@application/v1/controllers/area/area.controller';
import { AreaPrismaRepository } from '@infra/repositories/area-prisma-repository';
import PrismaFactory from '../prisma.factory';

export default class AreaControllerFactory {
  private static areaControllerFactory: AreaController;
  static async make(areaService?: AbstractAreaService): Promise<AreaController> {
    if (this.areaControllerFactory) {
      return this.areaControllerFactory;
    }

    const areaRepository = new AreaPrismaRepository(PrismaFactory.make());

    this.areaControllerFactory = new AreaController(areaService || (await AreaServiceFactory.make(areaRepository)));
    return this.areaControllerFactory;
  }
}
