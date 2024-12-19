/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSystemActionDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required:
 *         - name
 */
export class CreateSystemActionDTO {
  public readonly systemActionId!: string;
  constructor(public readonly name: string) {}
}
