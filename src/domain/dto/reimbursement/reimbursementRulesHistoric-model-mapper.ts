import { ReimbursementRuleHistoric, ReimbursementRuleHistoricProps } from '@domain/entities/ReimbursementRuleHistoric';
import { reimbursementRulesHistoric as ReimbursementRuleHistoricPrismaModel } from '@prisma/client';

export class ReimbursementRuleHistoricModelMapper {
  static toEntity(model: ReimbursementRuleHistoricPrismaModel) {
    const data: ReimbursementRuleHistoricProps = {
      reimbursementRulesHistoricId: model.reimbursementRulesHistoricId,
      reimbursementRulesId: model.reimbursementRulesId,
      newValue: model.newValue,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return new ReimbursementRuleHistoric(data);
  }
}
