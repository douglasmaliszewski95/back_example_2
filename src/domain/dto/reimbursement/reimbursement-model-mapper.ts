import { Reimbursement, ReimbursementProps } from '@domain/entities/Reimbursement';
import {
  reimbursement as ReimbursementPrismaModel,
  reimbursementRules as ReimbursementRulePrismaModel,
  reimbursementEvidence as ReimbursementEvidencePrismaModel,
  reimbursementsOCRLog as ReimbursementsOCRLogPrismaModel,
  reimbursementStatus as ReimbursementStatusPrismaModel,
  reimbursementsValidation as ReimbursementsValidationPrismaModel,
  validations as ValidationsPrismaModel,
  Users as UserPrismaModel,
} from '@prisma/client';

type reimbursementsValidation = ReimbursementsValidationPrismaModel & {
  validations?: ValidationsPrismaModel;
};

export type ReimbursementRuleData = ReimbursementPrismaModel & {
  users?: UserPrismaModel;
  reimbursementRules?: ReimbursementRulePrismaModel;
  reimbursementEvidence?: ReimbursementEvidencePrismaModel[];
  reimbursementsOCRLog?: ReimbursementsOCRLogPrismaModel[];
  reimbursementStatus?: ReimbursementStatusPrismaModel[];
  reimbursementsValidation?: reimbursementsValidation[];
};

export class ReimbursementModelMapper {
  static toEntity(model: ReimbursementRuleData) {
    const data: ReimbursementProps = {
      reimbursementId: model.reimbursementId,
      status: model.status,
      userId: model.userId,
      name: model.users?.name,
      reimbursementRulesId: model.reimbursementRulesId,
      dateRequest: model.dateRequest,
      note: model.note,
      dateExpense: model.dateExpense,
      valueInvoice: model.valueInvoice as unknown as number,
      valueReimbursement: model.valueReimbursement as unknown as number,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    if (model.reimbursementRules) {
      data.reimbursementRule = {
        reimbursementRulesId: model.reimbursementRules.reimbursementRulesId,
        valueLimit: model.reimbursementRules.valueLimit
          ? (model.reimbursementRules.valueLimit as unknown as number)
          : 0,
        beginDate: model.reimbursementRules.beginDate,
        rules: model.reimbursementRules.rules,
        name: model.reimbursementRules.name,
        regionOperationId: model.reimbursementRules.regionOperationId,
        languageId: model.reimbursementRules.languageId,
        icon: model.reimbursementRules.icon,
        excluded: model.reimbursementRules.excluded,
      };
    }

    if (model.reimbursementEvidence) {
      data.reimbursementEvidence = model.reimbursementEvidence.map((reimbursementEvidence) => ({
        reimbursementEvidenceId: reimbursementEvidence?.reimbursementEvidenceId,
        reimbursementId: reimbursementEvidence?.reimbursementId,
        type: reimbursementEvidence?.type,
        document: reimbursementEvidence?.document,
      }));
    }

    if (model.reimbursementsOCRLog) {
      data.reimbursementsOCRLog = model.reimbursementsOCRLog.map((reimbursementsOCRLog) => ({
        reimbursementOCRLogId: reimbursementsOCRLog.reimbursementOCRLogId,
        reimbursementId: reimbursementsOCRLog.reimbursementId,
        OCRDate: reimbursementsOCRLog.OCRDate,
        OCRValue: reimbursementsOCRLog.OCRValue as unknown as number,
        OCRItens: reimbursementsOCRLog.OCRItens,
      }));
    }

    if (model.reimbursementStatus) {
      data.reimbursementStatus = model.reimbursementStatus.map((reimbursementStatus) => ({
        reimbursementStatusId: reimbursementStatus.reimbursementStatusId,
        reimbursementId: reimbursementStatus.reimbursementId,
        commentary: reimbursementStatus.commentary,
        status: reimbursementStatus.status,
        createdAt: reimbursementStatus.createdAt,
      }));
    }

    if (model.reimbursementsValidation) {
      data.reimbursementsValidation = model.reimbursementsValidation.map((reimbursementsValidation) => ({
        reimbursementsValidationId: reimbursementsValidation.reimbursementsValidationId,
        // reimbursementId: reimbursementsValidation.reimbursementId,
        validationsId: reimbursementsValidation.validationsId,
        name: reimbursementsValidation.validations?.name,
      }));
    }

    return new Reimbursement(data);
  }
}
