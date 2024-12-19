export type StateProps = {
  stateId?: number;
  countryId: number;
  name: string;
  stateIsoCode: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     State:
 *       type: object
 *       properties:
 *         stateId:
 *           type: number
 *         countryId:
 *           type: number
 *         name:
 *           type: string
 *         stateIsoCode:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export class State {
  stateId?: number;
  countryId!: number;
  name!: string;
  stateIsoCode!: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: StateProps) {
    Object.assign(this, props);
  }
}
