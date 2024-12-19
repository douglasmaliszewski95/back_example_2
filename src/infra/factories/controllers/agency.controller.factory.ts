import PrismaFactory from '../prisma.factory';
import AgencyController from '@application/v1/controllers/agency/agency.controller';
import { AbstractAgencyService } from '@application/services/agency/abstract-agency.service';
import AgencyServiceFactory from '../services/agency.service.factory';
import { AgencyPrismaRepository } from '@infra/repositories/agency-prisma-repository';

export default class AgencyControllerFactory {
  private static agencyControllerFactory: AgencyController;

  static async make(agencyService?: AbstractAgencyService): Promise<AgencyController> {
    if (this.agencyControllerFactory) {
      return this.agencyControllerFactory;
    }

    const agencyRepository = new AgencyPrismaRepository(PrismaFactory.make());

    this.agencyControllerFactory = new AgencyController(
      agencyService || (await AgencyServiceFactory.make(agencyRepository)),
    );
    return this.agencyControllerFactory;
  }
}
