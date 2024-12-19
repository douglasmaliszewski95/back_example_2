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
 *     UserPositions:
 *       type: object
 *       properties:
 *         userPositionId:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         positionId:
 *           type: string
 *           format: uuid
 */
type UserPositions = {
  userPositionId?: string;
  userId?: string;
  positionId: string;
};

export type PositionProps = {
  positionId?: string;
  regionOperationId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  userPositions?: UserPositions[];
  regionOperation?: RegionOperation;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Position:
 *       type: object
 *       properties:
 *         positionId:
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
 *         userPositions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserPositions'
 *         regionOperation:
 *           $ref: '#/components/schemas/RegionOperation'
 *
 */
export class Position {
  positionId?: string;
  regionOperationId!: string;
  name!: string;
  createdAt?: Date;
  updatedAt?: Date;
  userPositions?: UserPositions[];
  regionOperation?: RegionOperation;

  constructor(props: PositionProps) {
    Object.assign(this, props);
    this.positionId = props.positionId || randomUUID();
  }
}
