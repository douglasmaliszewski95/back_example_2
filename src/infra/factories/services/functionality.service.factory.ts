import { FunctionalityRepository } from '@domain/repositories/functionality-repository';
import { AbstractFunctionalityService } from '@application/services/functionality/abstract-functionality.service';
import { FunctionalityService } from '@application/services/functionality/functionality.service';

export default class FunctionalityServiceFactory {
  private static functionalityServiceFactory: AbstractFunctionalityService;

  static async make(functionalityRepository: FunctionalityRepository): Promise<AbstractFunctionalityService> {
    if (this.functionalityServiceFactory) {
      return this.functionalityServiceFactory;
    }

    this.functionalityServiceFactory = new FunctionalityService(functionalityRepository);
    return this.functionalityServiceFactory;
  }
}
