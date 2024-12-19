/**
 * @openapi
 * components:
 *   schemas:
 *     CreateStateDTO:
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
export class CreateStateDTO {
  public readonly stateId!: number;
  constructor(
    public readonly countryId: number,
    public readonly name: string,
    public readonly stateIsoCode: string,
  ) {}
}
