import { CreateReimbursementRuleDTO } from '@domain/dto/reimbursement/create-reimbursementRules-dto';
import { AbstractReimbursementRuleService } from './abstract-reimbursementRule.service';
import { ReimbursementRule } from '@domain/entities/ReimbursementRule';
import AppError from '@domain/exceptions/AppError';
import { ReimbursementRuleRepository } from '@domain/repositories/reimbursementRule-repository';
import { UserRepository } from '@domain/repositories/user-repository';
import { LogRepository } from '@domain/repositories/log-repository';
import { SystemActionRepository } from '@domain/repositories/systemAction-repository';
import { NOT_FOUND } from 'http-status';
import {
  UpdateReimbursementRuleDTO,
  ReimbursementRuleHistoric,
} from '@domain/dto/reimbursement/update-reimbursementRules-dto';
import { PaginatedData, paginator } from '@application/utils/pagination';

export class ReimbursementRuleService implements AbstractReimbursementRuleService {
  constructor(
    private reimbursementRuleRepository: ReimbursementRuleRepository,
    private userRepository: UserRepository,
    private logRepository: LogRepository,
    private systemActionRepository: SystemActionRepository,
  ) {}

  async list(page: number, pageSize: number): Promise<PaginatedData<ReimbursementRule>> {
    const reimbursementRules = await this.reimbursementRuleRepository.findAll();

    const paginatedRules = paginator(reimbursementRules, page, pageSize);

    return paginatedRules;
  }

  async listById(reimbursementRuleId: string): Promise<ReimbursementRule | null> {
    const reimbursementRule = await this.reimbursementRuleRepository.findById(reimbursementRuleId);

    return reimbursementRule;
  }

  async listRulesByUserId(userId: string): Promise<ReimbursementRule[]> {
    const userData = await this.userRepository.show(userId);

    const reimbursementRules = await this.reimbursementRuleRepository.findRulesByUser();

    const rules: ReimbursementRule[] = [];
    for (let i = 0; i < reimbursementRules.length; i++) {
      const area = userData?.userAreas?.find(
        (area) => reimbursementRules[i].reimbursementRulesAreas?.find((y) => y.areaId === area.areaId),
      );

      const position = userData?.userPositions?.find(
        (area) => reimbursementRules[i].reimbursementRulesPositions?.find((y) => y.positionId === area.positionId),
      );
      if (area && position) rules.push(reimbursementRules[i]);
    }

    return rules;
  }

  async createReimbursementRule(userId: string, ruleData: CreateReimbursementRuleDTO): Promise<ReimbursementRule> {
    const reimbursementRuleDto = new CreateReimbursementRuleDTO(
      ruleData.valueLimit,
      ruleData.beginDate,
      ruleData.rules,
      ruleData.name,
      ruleData.regionOperationId,
      ruleData.languageId,
      ruleData.icon,
      ruleData.excluded,
      ruleData.reimbursementRuleAreas,
      ruleData.reimbursementRulePositions,
      ruleData.reimbursementRuleItens,
    );

    const reimbursementRule = await this.reimbursementRuleRepository.insert(reimbursementRuleDto);

    if (reimbursementRule) {
      const systemAction = await this.systemActionRepository.findByName('Reembolso - Novo');

      await this.logRepository.insert({
        userId: userId,
        systemActionId: systemAction?.systemActionId ? systemAction.systemActionId : '0',
        date: new Date(),
        message: `Cadastro de Novo Tipo de Reembolso: ${ruleData.name}`,
      });
    }

    return reimbursementRule;
  }

  async updateReimbursementRule(
    reimbursementRuleId: string,
    ruleData: UpdateReimbursementRuleDTO,
  ): Promise<ReimbursementRule> {
    const rule = await this.reimbursementRuleRepository.findById(reimbursementRuleId);

    if (!rule) {
      throw new AppError('Rule not found', NOT_FOUND);
    }

    let message: string = '';
    if (ruleData.valueLimit !== rule.valueLimit) message += `Value has changed. New value ${ruleData.valueLimit};`;

    if (new Date(ruleData.beginDate).toISOString() !== new Date(rule.beginDate).toISOString())
      message += `Date has changed. New Date ${ruleData.beginDate};`;

    if (ruleData.rules !== rule.rules) message += `Rules has changed. New Rules ${ruleData.rules};`;

    const reimbursementRuleHistoric: ReimbursementRuleHistoric = {
      newValue: message,
      name: ruleData.name,
      createdAt: new Date(),
    };

    const reimbursementRuleDto = new UpdateReimbursementRuleDTO(
      reimbursementRuleId,
      ruleData.valueLimit,
      ruleData.beginDate,
      ruleData.rules,
      ruleData.name,
      ruleData.regionOperationId,
      ruleData.languageId,
      ruleData.icon,
      ruleData.excluded,
      ruleData.reimbursementRuleAreas,
      ruleData.reimbursementRulePositions,
      ruleData.reimbursementRuleItens,
      reimbursementRuleHistoric,
    );

    const ruleUpdated = await this.reimbursementRuleRepository.update(reimbursementRuleDto);

    return ruleUpdated;
  }

  async enableDisable(reimbursementRuleId: string): Promise<void> {
    const rule = await this.reimbursementRuleRepository.findById(reimbursementRuleId);

    if (!rule) {
      throw new AppError('Rule not found', NOT_FOUND);
    }

    await this.userRepository.enableDisable(reimbursementRuleId, !rule.excluded);
  }
}
