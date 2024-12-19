import { AreaRepository } from '@domain/repositories/area-repository';
import { AbstractAreaService } from '@application/services/area/abstract-area.service';
import { AreaService } from '@application/services/area/area.service';

export default class AreaServiceFactory {
  private static areaServiceFactory: AbstractAreaService;

  static async make(areaRepository: AreaRepository): Promise<AbstractAreaService> {
    if (this.areaServiceFactory) {
      return this.areaServiceFactory;
    }

    this.areaServiceFactory = new AreaService(areaRepository);
    return this.areaServiceFactory;
  }
}
