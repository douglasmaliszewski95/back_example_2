import { randomUUID } from 'crypto';
import { ReimbursementRule } from './ReimbursementRule';

export type ReimbursementRuleHistoricProps = {
  reimbursementRulesHistoricId?: string;
  reimbursementRulesId: string;
  name: string;
  newValue: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  reimbursementRules?: ReimbursementRule;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ReimbursementRuleHistoric:
 *       type: object
 *       properties:
 *         reimbursementRulesHistoricId:
 *           type: string
 *           format: uuid
 *         reimbursementRulesId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         newValue:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         reimbursementRules:
 *           $ref: '#/components/schemas/ReimbursementRule'
 */
export class ReimbursementRuleHistoric {
  reimbursementRulesHistoricId?: string;
  reimbursementRulesId!: string;
  name!: string;
  newValue!: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  reimbursementRules?: ReimbursementRule;

  constructor(props: ReimbursementRuleHistoricProps) {
    Object.assign(this, props);
    this.reimbursementRulesHistoricId = props.reimbursementRulesHistoricId || randomUUID();
  }
}
