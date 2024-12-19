import { ReimbursementRuleItem, ReimbursementRuleItemProps } from '@domain/entities/ReimbursementRuleItem';
import { reimbursementRulesItens as ReimbursementRuleItemPrismaModel } from '@prisma/client';

export class ReimbursementRuleItemModelMapper {
  static toEntity(model: ReimbursementRuleItemPrismaModel) {
    const data: ReimbursementRuleItemProps = {
      reimbursementRulesItemId: model.reimbursementRulesItensId,
      reimbursementRulesId: model.reimbursementRulesId,
      value: model.value ? (model.value as unknown as number) : 0,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return new ReimbursementRuleItem(data);
  }
}
