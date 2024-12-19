export type AgencyProps = {
  agenciyId: string;
  regionOperationId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Agency:
 *       type: object
 *       properties:
 *         agenciyId:
 *           type: string
 *           format: uuid
 *         regionOperationId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export class Agency {
  agenciyId!: string;
  regionOperationId!: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: AgencyProps) {
    Object.assign(this, props);
  }
}
