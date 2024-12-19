import { PositionRepository } from '@domain/repositories/position-repository';
import { AbstractPositionService } from '@application/services/position/abstract-position.service';
import { PositionService } from '@application/services/position/position.service';

export default class PositionServiceFactory {
  private static positionServiceFactory: AbstractPositionService;

  static async make(positionRepository: PositionRepository): Promise<AbstractPositionService> {
    if (this.positionServiceFactory) {
      return this.positionServiceFactory;
    }

    this.positionServiceFactory = new PositionService(positionRepository);
    return this.positionServiceFactory;
  }
}
