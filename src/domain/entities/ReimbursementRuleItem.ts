import { randomUUID } from 'crypto';
import { ReimbursementRule } from './ReimbursementRule';

export type ReimbursementRuleItemProps = {
  reimbursementRulesItemId?: string;
  reimbursementRulesId: string;
  name: string;
  value?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  reimbursementRules?: ReimbursementRule;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ReimbursementRuleItem:
 *       type: object
 *       properties:
 *         reimbursementRulesItemId:
 *           type: string
 *           format: uuid
 *         reimbursementRulesId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         value:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         reimbursementRules:
 *           $ref: '#/components/schemas/ReimbursementRule'
 */
export class ReimbursementRuleItem {
  reimbursementRulesItemId?: string;
  reimbursementRulesId!: string;
  name!: string;
  value?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  reimbursementRules?: ReimbursementRule;

  constructor(props: ReimbursementRuleItemProps) {
    Object.assign(this, props);
    this.reimbursementRulesItemId = props.reimbursementRulesItemId || randomUUID();
  }
}
