export type RegionOperationProps = {
  regionOperationId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     RegionOperation:
 *       type: object
 *       properties:
 *         regionOperationId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export class RegionOperation {
  regionOperationId!: string;
  name!: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: RegionOperationProps) {
    Object.assign(this, props);
  }
}
