import { randomUUID } from 'crypto';

export type FunctionalityProps = {
  functionalityId?: string;
  name: string;
  system: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Functionality:
 *       type: object
 *       properties:
 *         functionalityId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         system:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export class Functionality {
  functionalityId?: string;
  name!: string;
  system!: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: FunctionalityProps) {
    Object.assign(this, props);
    this.functionalityId = props.functionalityId || randomUUID();
  }
}
