import { randomUUID } from 'crypto';
import { ReimbursementRule } from './ReimbursementRule';

export type ReimbursementProps = {
  reimbursementId?: string;
  userId: string;
  name?: string;
  reimbursementRulesId: string;
  status: string;
  dateRequest: Date;
  note?: string | null;
  dateExpense: Date;
  valueInvoice: number;
  valueReimbursement: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  reimbursementRule?: ReimbursementRule;
  reimbursementEvidence?: ReimbursementEvidence[];
  reimbursementsOCRLog?: ReimbursementsOCRLog[];
  reimbursementStatus?: ReimbursementStatus[];
  reimbursementsValidation?: ReimbursementsValidation[];
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ReimbursementEvidence:
 *       type: object
 *       properties:
 *         reimbursementEvidenceId:
 *           type: string
 *           format: uuid
 *         reimbursementId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         document:
 *           type: string
 */
type ReimbursementEvidence = {
  reimbursementEvidenceId?: string;
  reimbursementId?: string;
  name?: string;
  document?: string;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ReimbursementsOCRLog:
 *       type: object
 *       properties:
 *         reimbursementOCRLogId:
 *           type: string
 *           format: uuid
 *         reimbursementId:
 *           type: string
 *           format: uuid
 *         OCRDate:
 *           type: string
 *           format: date-time
 *         OCRValue:
 *           type: number
 *         OCRItens:
 *           type: string
 */
type ReimbursementsOCRLog = {
  reimbursementOCRLogId?: string;
  reimbursementId?: string;
  OCRDate?: Date | null;
  OCRValue?: number;
  OCRItens?: string | null;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ReimbursementStatus:
 *       type: object
 *       properties:
 *         reimbursementStatusId:
 *           type: string
 *           format: uuid
 *         reimbursementId:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *         commentary:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
type ReimbursementStatus = {
  reimbursementStatusId?: string;
  reimbursementId?: string;
  status?: string;
  commentary?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ReimbursementsValidation:
 *       type: object
 *       properties:
 *         reimbursementsValidationId:
 *           type: string
 *           format: uuid
 *         reimbursementId:
 *           type: string
 *           format: uuid
 *         validationsId:
 *           type: string
 *           format: uuid
 */
type ReimbursementsValidation = {
  reimbursementsValidationId?: string;
  reimbursementId?: string;
  validationsId?: string;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Reimbursement:
 *       type: object
 *       properties:
 *         reimbursementId:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         reimbursementRulesId:
 *           type: string
 *           format: uuid
 *         dateRequest:
 *           type: string
 *           format: date-time
 *         note:
 *           type: string
 *         dateExpense:
 *           type: string
 *           format: date-time
 *         valueInvoice:
 *           type: number
 *         valueReimbursement:
 *           type: number
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         reimbursementRule:
 *           $ref: '#/components/schemas/ReimbursementRule'
 *         reimbursementEvidence:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReimbursementEvidence'
 *         reimbursementsOCRLog:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReimbursementsOCRLog'
 *         reimbursementStatus:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReimbursementStatus'
 *         reimbursementsValidation:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReimbursementsValidation'
 */
export class Reimbursement {
  reimbursementId?: string;
  userId!: string;
  name?: string;
  reimbursementRulesId!: string;
  dateRequest!: Date;
  note?: string;
  dateExpense!: Date;
  valueInvoice!: number;
  valueReimbursement!: number;
  status!: string;
  createdAt?: Date;
  updatedAt?: Date;
  reimbursementRule?: ReimbursementRule;
  reimbursementEvidence?: ReimbursementEvidence[];
  reimbursementsOCRLog?: ReimbursementsOCRLog[];
  reimbursementStatus?: ReimbursementStatus[];
  reimbursementsValidation?: ReimbursementsValidation[];

  constructor(props: ReimbursementProps) {
    Object.assign(this, props);
    this.reimbursementId = props.reimbursementId || randomUUID();
  }
}
