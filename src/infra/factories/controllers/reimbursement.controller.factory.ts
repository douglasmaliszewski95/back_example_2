import { AbstractReimbursementService } from '@application/services/reimbursement/abstract-reimbursement.service';
import ReimbursementServiceFactory from '../services/reimbursement.service.factory';
import ReimbursementController from '@application/v1/controllers/reimbursement/reimbursement.controller';
import { ReimbursementPrismaRepository } from '@infra/repositories/reimbursement-prisma-repository';
import PrismaFactory from '../prisma.factory';

export default class ReimbursementControllerFactory {
  private static reimbursementControllerFactory: ReimbursementController;
  static async make(reimbursementService?: AbstractReimbursementService): Promise<ReimbursementController> {
    if (this.reimbursementControllerFactory) {
      return this.reimbursementControllerFactory;
    }

    const reimbursementRepository = new ReimbursementPrismaRepository(PrismaFactory.make());

    this.reimbursementControllerFactory = new ReimbursementController(
      reimbursementService || (await ReimbursementServiceFactory.make(reimbursementRepository)),
    );
    return this.reimbursementControllerFactory;
  }
}
