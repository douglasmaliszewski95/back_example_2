import { AbstractAgencyService } from '@application/services/agency/abstract-agency.service';
import { AgencyService } from '@application/services/agency/agency.service';
import { AgencyRepository } from '@domain/repositories/agency-repository';

export default class AgencyServiceFactory {
  private static agencyServiceFactory: AbstractAgencyService;

  static async make(agencyRepository: AgencyRepository): Promise<AbstractAgencyService> {
    if (this.agencyServiceFactory) {
      return this.agencyServiceFactory;
    }

    this.agencyServiceFactory = new AgencyService(agencyRepository);
    return this.agencyServiceFactory;
  }
}
