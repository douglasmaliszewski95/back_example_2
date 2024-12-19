/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateStateDTO:
 *       type: object
 *       properties:
 *         countryId:
 *           type: number
 *         name:
 *           type: string
 *         stateIsoCode:
 *           type: string
 *       required:
 *         - countryId
 *         - name
 *         - stateIsoCode
 */
export class UpdateStateDTO {
  constructor(
    public readonly stateId: number,
    public readonly countryId: number,
    public readonly name: string,
    public readonly stateIsoCode: string,
  ) {}
}
