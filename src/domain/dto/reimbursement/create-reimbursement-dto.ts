import { randomUUID } from 'crypto';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateReimbursementOCRLogDTO:
 *       type: object
 *       properties:
 *         ocrValue:
 *           type: string
 *         ocrItem:
 *           type: string
 *         ocrDate:
 *           type: string
 *           format: date-time
 */
type CreateReimbursementOCRLogDTO = {
  ocrValue: string;
  ocrItem: string;
  ocrDate: Date;
};

type CreateReimbursementDTOProps = {
  userId: string;
  reimbursementRulesId: string;
  dateRequest: Date;
  note?: string;
  status: string;
  dateExpense: Date;
  valueInvoice: number;
  valueReimbursement: number;
  reimbursementsOCRLog: CreateReimbursementOCRLogDTO[];
  reimbursementsValidation: string[];
};

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateReimbursementDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *         reimbursementRulesId:
 *           type: string
 *           format: uuid
 *         dateRequest:
 *           type: string
 *           format: date-time
 *         note:
 *           type: string
 *         status:
 *           type: string
 *         dateExpense:
 *           type: string
 *           format: date-time
 *         valueInvoice:
 *           type: number
 *         valueReimbursement:
 *           type: number
 *         reimbursementsOCRLog:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateReimbursementOCRLogDTO'
 *         reimbursementsValidation:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 */
export class CreateReimbursementDTO {
  readonly reimbursementId: string;
  readonly userId!: string;
  readonly reimbursementRulesId!: string;
  readonly dateRequest!: Date;
  readonly note?: string;
  readonly status!: string;
  readonly dateExpense!: Date;
  readonly valueInvoice!: number;
  readonly valueReimbursement!: number;
  readonly reimbursementsOCRLog!: CreateReimbursementOCRLogDTO[];
  readonly reimbursementsValidation!: string[];
  constructor(props: CreateReimbursementDTOProps) {
    Object.assign(this, props);
    this.reimbursementId = randomUUID();
  }
}
