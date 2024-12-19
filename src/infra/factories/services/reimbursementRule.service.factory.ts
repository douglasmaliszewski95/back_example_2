import { ReimbursementRuleRepository } from '@domain/repositories/reimbursementRule-repository';
// eslint-disable-next-line max-len
import { AbstractReimbursementRuleService } from '@application/services/reimbursementRule/abstract-reimbursementRule.service';
import { ReimbursementRuleService } from '@application/services/reimbursementRule/reimbursementRule.service';
// import { AbstractUserService } from '@application/services/user/abstract-user.service';
import { UserRepository } from '@domain/repositories/user-repository';
import { LogRepository } from '@domain/repositories/log-repository';
import { SystemActionRepository } from '@domain/repositories/systemAction-repository';

export default class ReimbursementRuleServiceFactory {
  private static reimbursementRuleServiceFactory: AbstractReimbursementRuleService;
  // private static userRuleServiceFactory: AbstractUserService;

  static async make(
    reimbursementRuleRepository: ReimbursementRuleRepository,
    userRepository: UserRepository,
    logRepository: LogRepository,
    systemActionRepository: SystemActionRepository,
  ): Promise<AbstractReimbursementRuleService> {
    if (this.reimbursementRuleServiceFactory) {
      return this.reimbursementRuleServiceFactory;
    }

    this.reimbursementRuleServiceFactory = new ReimbursementRuleService(
      reimbursementRuleRepository,
      userRepository,
      logRepository,
      systemActionRepository,
    );
    return this.reimbursementRuleServiceFactory;
  }
}
