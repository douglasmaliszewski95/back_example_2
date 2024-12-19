export type SystemActionProps = {
  systemActionId: string;
  name: string;
  excluded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     SystemAction:
 *       type: object
 *       properties:
 *         systemActionId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         excluded:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export class SystemAction {
  systemActionId?: string;
  name!: string;
  excluded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: SystemActionProps) {
    Object.assign(this, props);
  }
}
