/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateSystemActionDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required:
 *         - name
 */
export class UpdateSystemActionDTO {
  constructor(
    public readonly systemActionId: string,
    public readonly name: string,
  ) {}
}
