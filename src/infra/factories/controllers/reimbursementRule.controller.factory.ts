// eslint-disable-next-line max-len
import { AbstractReimbursementRuleService } from '@application/services/reimbursementRule/abstract-reimbursementRule.service';
import ReimbursementRuleServiceFactory from '../services/reimbursementRule.service.factory';
import ReimbursementRuleController from '@application/v1/controllers/reimbursementRule/reimbursementRule.controller';
import { ReimbursementRulePrismaRepository } from '@infra/repositories/reimbursementRule-prisma-repository';
import PrismaFactory from '../prisma.factory';
import { UserPrismaRepository } from '@infra/repositories/user-prisma-repository';
import { LogPrismaRepository } from '@infra/repositories/log-prisma-repository';
import { SystemActionPrismaRepository } from '@infra/repositories/systemAction-prisma-repository';

export default class ReimbursementRuleControllerFactory {
  private static reimbursementRuleControllerFactory: ReimbursementRuleController;
  static async make(reimbursementRuleService?: AbstractReimbursementRuleService): Promise<ReimbursementRuleController> {
    if (this.reimbursementRuleControllerFactory) {
      return this.reimbursementRuleControllerFactory;
    }

    const reimbursementRuleRepository = new ReimbursementRulePrismaRepository(PrismaFactory.make());
    const userRepository = new UserPrismaRepository(PrismaFactory.make());
    const logRepository = new LogPrismaRepository(PrismaFactory.make());
    const systemActionRepository = new SystemActionPrismaRepository(PrismaFactory.make());

    this.reimbursementRuleControllerFactory = new ReimbursementRuleController(
      reimbursementRuleService ||
        (await ReimbursementRuleServiceFactory.make(
          reimbursementRuleRepository,
          userRepository,
          logRepository,
          systemActionRepository,
        )),
    );
    return this.reimbursementRuleControllerFactory;
  }
}
