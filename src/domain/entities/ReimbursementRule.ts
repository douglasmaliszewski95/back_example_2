import { randomUUID } from 'crypto';
// import { Reimbursement } from './Reimbursement';
import { ReimbursementRuleHistoric } from './ReimbursementRuleHistoric';
import { ReimbursementRuleItem } from './ReimbursementRuleItem';

/**
 * @openapi
 * components:
 *   schemas:
 *     ReimbursementRulesAreas:
 *       type: object
 *       properties:
 *         reimbursementRulesAreaId:
 *           type: string
 *           format: uuid
 *         reimbursementRulesId:
 *           type: string
 *           format: uuid
 *         areaId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 */
type ReimbursementRulesAreas = {
  reimbursementRulesAreaId?: string;
  reimbursementRulesId?: string;
  areaId: string;
  name?: string;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ReimbursementRulesPositions:
 *       type: object
 *       properties:
 *         reimbursementRulesPositionId:
 *           type: string
 *           format: uuid
 *         reimbursementRulesId:
 *           type: string
 *           format: uuid
 *         positionId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 */
type ReimbursementRulesPositions = {
  reimbursementRulesPositionId?: string;
  reimbursementRulesId?: string;
  positionId: string;
  name?: string;
};

export type ReimbursementRuleProps = {
  reimbursementRulesId?: string;
  name: string;
  valueLimit?: number | null;
  beginDate: Date;
  rules: string;
  regionOperationId: string;
  languageId: string;
  icon: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  excluded: boolean;
  // reimbursements?: Reimbursement[];
  reimbursementRulesAreas?: ReimbursementRulesAreas[];
  reimbursementRulesPositions?: ReimbursementRulesPositions[];
  reimbursementRulesHistoric?: ReimbursementRuleHistoric[];
  reimbursementRulesItens?: ReimbursementRuleItem[];
};

/**
 * @openapi
 * components:
 *   schemas:
 *     ReimbursementRule:
 *       type: object
 *       properties:
 *         reimbursementRulesId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         valueLimit:
 *           type: number
 *         beginDate:
 *           type: string
 *           format: date
 *         rules:
 *           type: string
 *         regionOperationId:
 *           type: string
 *           format: uuid
 *         languageId:
 *           type: string
 *           format: uuid
 *         icon:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         excluded:
 *           type: boolean
 *         reimbursementRulesAreas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReimbursementRulesAreas'
 *         reimbursementRulesPositions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReimbursementRulesPositions'
 *         reimbursementRulesHistoric:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReimbursementRuleHistoric'
 *         reimbursementRulesItens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReimbursementRuleItem'
 */
export class ReimbursementRule {
  reimbursementRulesId?: string;
  name!: string;
  valueLimit?: number;
  beginDate!: Date;
  rules!: string;
  regionOperationId!: string;
  languageId!: string;
  icon!: string;
  createdAt?: Date;
  updatedAt?: Date;
  excluded!: boolean;
  // reimbursements?: Reimbursement[];
  readonly reimbursementRulesAreas?: ReimbursementRulesAreas[];
  readonly reimbursementRulesPositions?: ReimbursementRulesPositions[];
  readonly reimbursementRulesHistoric?: ReimbursementRuleHistoric[];
  readonly reimbursementRulesItens?: ReimbursementRuleItem[];

  constructor(props: ReimbursementRuleProps) {
    Object.assign(this, props);
    this.reimbursementRulesId = props.reimbursementRulesId || randomUUID();
  }
}
