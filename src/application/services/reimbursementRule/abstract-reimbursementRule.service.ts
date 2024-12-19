import { PaginatedData } from '@application/utils/pagination';
import { CreateReimbursementRuleDTO } from '@domain/dto/reimbursement/create-reimbursementRules-dto';
import { UpdateReimbursementRuleDTO } from '@domain/dto/reimbursement/update-reimbursementRules-dto';
import { ReimbursementRule } from '@domain/entities/ReimbursementRule';

export abstract class AbstractReimbursementRuleService {
  abstract list(page: number, pagesize: number): Promise<PaginatedData<ReimbursementRule>>;
  abstract listById(reimbursementRuleId: string): Promise<ReimbursementRule | null>;
  abstract listRulesByUserId(userId: string): Promise<ReimbursementRule[]>;
  abstract createReimbursementRule(userId: string, ruleData: CreateReimbursementRuleDTO): Promise<ReimbursementRule>;
  abstract updateReimbursementRule(
    reimbursementRuleId: string,
    ruleData: UpdateReimbursementRuleDTO,
  ): Promise<ReimbursementRule>;
  abstract enableDisable(reimbursementRuleId: string): Promise<void>;
}
