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
 */
type SystemAction = {
  systemActionId?: string;
  name?: string;
};

export type LogProps = {
  logId?: string;
  systemActionId: string;
  userId: string;
  date: Date;
  message: string;
  systemActions?: SystemAction;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         logId:
 *           type: string
 *           format: uuid
 *         systemActionId:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date-time
 *         message:
 *           type: string
 *         systemActions:
 *           $ref: '#/components/schemas/SystemAction'
 */
export class Log {
  logId?: string;
  systemActionId!: string;
  userId!: string;
  date!: Date;
  message!: string;
  systemActions?: SystemAction;

  constructor(props: LogProps) {
    Object.assign(this, props);
  }
}
