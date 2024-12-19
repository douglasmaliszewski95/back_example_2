// import { ReimbursementRuleHistoric } from '@domain/entities/ReimbursementRuleHistoric';

export type ReimbursementRuleHistoric = {
  reimbursementRulesHistoricId?: string;
  reimbursementRulesId?: string;
  newValue: string;
  name?: string;
  createdAt: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateReimbursementRuleDTO:
 *       type: object
 *       properties:
 *         valueLimit:
 *           type: number
 *         beginDate:
 *           type: string
 *           format: date-time
 *         rules:
 *           type: string
 *         name:
 *           type: string
 *         regionOperationId:
 *           type: string
 *           format: uuid
 *         languageId:
 *           type: string
 *           format: uuid
 *         icon:
 *           type: string
 *         excluded:
 *           type: boolean
 *         reimbursementRuleAreas:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         reimbursementRulePositions:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         reimbursementRuleItens:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         reimbursementRuleHistoric:
 *           $ref: '#/components/schemas/ReimbursementRuleHistoric'
 */
export class UpdateReimbursementRuleDTO {
  constructor(
    public readonly reimbursementRuleId: string,
    public readonly valueLimit: number,
    public readonly beginDate: Date,
    public readonly rules: string,
    public readonly name: string,
    public readonly regionOperationId: string,
    public readonly languageId: string,
    public readonly icon: string,
    public readonly excluded: boolean,
    public readonly reimbursementRuleAreas: string[],
    public readonly reimbursementRulePositions: string[],
    public readonly reimbursementRuleItens: string[],
    public readonly reimbursementRuleHistoric: ReimbursementRuleHistoric,
  ) {}
}
