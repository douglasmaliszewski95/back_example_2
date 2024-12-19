// eslint-disable-next-line max-len
import { AbstractRegionOperationService } from '@application/services/region-operation/abstract-region-operation.service';
import PrismaFactory from '../prisma.factory';
import RegionOperationController from '@application/v1/controllers/region-operation/region-operation.controller';
import RegionOperationServiceFactory from '../services/region-operation.service.factory';
import { RegionOperationPrismaRepository } from '@infra/repositories/region-operation-prisma-repository';

export default class RegionOperationControllerFactory {
  private static regionOperationControllerFactory: RegionOperationController;
  static async make(regionOperationService?: AbstractRegionOperationService): Promise<RegionOperationController> {
    if (this.regionOperationControllerFactory) {
      return this.regionOperationControllerFactory;
    }

    const regionOperationRepository = new RegionOperationPrismaRepository(PrismaFactory.make());

    this.regionOperationControllerFactory = new RegionOperationController(
      regionOperationService || (await RegionOperationServiceFactory.make(regionOperationRepository)),
    );
    return this.regionOperationControllerFactory;
  }
}
