import { CreateReimbursementRuleDTO } from '@domain/dto/reimbursement/create-reimbursementRules-dto';
import { UpdateReimbursementRuleDTO } from '@domain/dto/reimbursement/update-reimbursementRules-dto';
import { ReimbursementRule } from '@domain/entities/ReimbursementRule';

export interface ReimbursementRuleRepository {
  findAll(): Promise<ReimbursementRule[]>;

  findById(reimbursementRuleId: string): Promise<ReimbursementRule | null>;

  findRulesByUser(): Promise<ReimbursementRule[]>;

  insert(dto: CreateReimbursementRuleDTO): Promise<ReimbursementRule>;

  update(dto: UpdateReimbursementRuleDTO): Promise<ReimbursementRule>;

  enableDisable(id: string, active: boolean): Promise<void>;
}
