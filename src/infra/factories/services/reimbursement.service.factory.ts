import { ReimbursementRepository } from '@domain/repositories/reimbursement-repository';
import { AbstractReimbursementService } from '@application/services/reimbursement/abstract-reimbursement.service';
import { ReimbursementService } from '@application/services/reimbursement/reimbursement.service';

export default class ReimbursementServiceFactory {
  private static reimbursementServiceFactory: AbstractReimbursementService;

  static async make(reimbursementRepository: ReimbursementRepository): Promise<AbstractReimbursementService> {
    if (this.reimbursementServiceFactory) {
      return this.reimbursementServiceFactory;
    }

    this.reimbursementServiceFactory = new ReimbursementService(reimbursementRepository);
    return this.reimbursementServiceFactory;
  }
}
