import { randomUUID } from 'crypto';

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
type RegionOperation = {
  regionOperationId?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     UserAreas:
 *       type: object
 *       properties:
 *         userAreaId:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         areaId:
 *           type: string
 *           format: uuid
 */
type UserAreas = {
  userAreaId?: string;
  userId?: string;
  areaId: string;
};

export type AreaProps = {
  areaId?: string;
  regionOperationId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  userAreas?: UserAreas[];
  regionOperation?: RegionOperation;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       properties:
 *         areaId:
 *           type: string
 *           format: uuid
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
 *         userAreas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserAreas'
 *         regionOperation:
 *           $ref: '#/components/schemas/RegionOperation'
 */
export class Area {
  areaId?: string;
  regionOperationId!: string;
  name!: string;
  createdAt?: Date;
  updatedAt?: Date;
  userAreas?: UserAreas[];
  regionOperation?: RegionOperation;

  constructor(props: AreaProps) {
    Object.assign(this, props);
    this.areaId = props.areaId || randomUUID();
  }
}
