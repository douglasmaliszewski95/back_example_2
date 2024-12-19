// eslint-disable-next-line max-len
import { AbstractRegionOperationService } from '@application/services/region-operation/abstract-region-operation.service';
import { RegionOperationService } from '@application/services/region-operation/region-operation.service';
import { RegionOperationRepository } from '@domain/repositories/region-operation-repository';

export default class RegionOperationServiceFactory {
  private static regionOperationServiceFactory: AbstractRegionOperationService;

  static async make(regionOperationRepository: RegionOperationRepository): Promise<AbstractRegionOperationService> {
    if (this.regionOperationServiceFactory) {
      return this.regionOperationServiceFactory;
    }

    this.regionOperationServiceFactory = new RegionOperationService(regionOperationRepository);
    return this.regionOperationServiceFactory;
  }
}
