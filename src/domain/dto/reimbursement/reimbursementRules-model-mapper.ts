import { ReimbursementRule, ReimbursementRuleProps } from '@domain/entities/ReimbursementRule';
import {
  reimbursementRules as ReimbursementRulePrismaModel,
  // reimbursement as ReimbursementPrismaModel,
  reimbursementRulesHistoric as ReimbursementRuleHistoricPrismaModel,
  reimbursementRulesItens as ReimbursementRulesItens,
  reimbursementRulesAreas as ReimbursementRulesAreasPrismaModel,
  reimbursementRulesPositions as ReimbursementRulesPositionPrismaModel,
  areas as AreasPrismaModel,
  positions as PositionsPrismaModel,
} from '@prisma/client';

type ReimbursementRulesArea = ReimbursementRulesAreasPrismaModel & {
  areas?: AreasPrismaModel;
};

type ReimbursementRulesPositions = ReimbursementRulesPositionPrismaModel & {
  positions?: PositionsPrismaModel;
};

export type ReimbursementRulesData = ReimbursementRulePrismaModel & {
  // reimbursement?: ReimbursementPrismaModel[];
  reimbursementRulesHistoric?: ReimbursementRuleHistoricPrismaModel[];
  reimbursementRulesItens?: ReimbursementRulesItens[];
  reimbursementRulesAreas?: ReimbursementRulesArea[];
  reimbursementRulesPositions?: ReimbursementRulesPositions[];
};

export class ReimbursementRuleModelMapper {
  static toEntity(model: ReimbursementRulesData) {
    const data: ReimbursementRuleProps = {
      reimbursementRulesId: model.reimbursementRulesId,
      name: model.name,
      valueLimit: model.valueLimit ? (model.valueLimit as unknown as number) : 0,
      beginDate: model.beginDate,
      rules: model.rules,
      regionOperationId: model.regionOperationId,
      languageId: model.languageId,
      icon: model.icon,
      excluded: model.excluded,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    if (model.reimbursementRulesHistoric) {
      data.reimbursementRulesHistoric = model.reimbursementRulesHistoric.map((historic) => ({
        reimbursementRulesHistoricId: historic.reimbursementRulesHistoricId,
        reimbursementRulesId: historic.reimbursementRulesId,
        name: historic.name,
        newValue: historic.newValue,
        createdAt: historic.createdAt,
        updatedAt: historic.updatedAt,
      }));
    }

    if (model.reimbursementRulesItens) {
      data.reimbursementRulesItens = model.reimbursementRulesItens.map((item) => ({
        reimbursementRulesItemId: item.reimbursementRulesItensId,
        reimbursementRulesId: item.reimbursementRulesId,
        name: item.name,
        value: item.value ? (item.value as unknown as number) : 0,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
    }

    if (model.reimbursementRulesAreas) {
      data.reimbursementRulesAreas = model.reimbursementRulesAreas.map((area) => ({
        areaId: area.areaId,
        name: area.areas?.name,
      }));
    }

    if (model.reimbursementRulesPositions) {
      data.reimbursementRulesPositions = model.reimbursementRulesPositions.map((position) => ({
        positionId: position.positionId,
        name: position.positions?.name,
      }));
    }

    return new ReimbursementRule(data);
  }
}
